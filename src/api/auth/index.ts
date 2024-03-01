import { Elysia, t } from "elysia";
import { userTable, usersInsertSchema } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/auth";
import { middleware } from "@/middleware";
import { InvalidSession } from "@/lib/utils";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .use(middleware)
  //FIXME : validation username / password
  .group("/", { body: t.Omit(usersInsertSchema, ["id"]) }, (app) =>
    app
      .post("/sign-in", async ({ body, cookie: { auth_session } }) => {
        const { username, password } = body;
        const existingUser = await db.query.userTable.findFirst({
          where: eq(userTable.username, username),
        });
        if (!existingUser) throw new Error("Incorrect username or password");
        const validPassword = await new Argon2id().verify(
          existingUser.password,
          password
        );
        if (!validPassword) throw new Error("Incorrect username or password");
        const session = await lucia.createSession(existingUser.id, {
          username,
        });
        const sessionCookie = lucia.createSessionCookie(session.id);
        auth_session.set({
          value: sessionCookie.value,
          ...sessionCookie.attributes,
        });
      })
      .post("/sign-up", async ({ body, cookie: { auth_session } }) => {
        const { username, password } = body;
        const hashedPassword = await new Argon2id().hash(password);
        const [insertedUser] = await db
          .insert(userTable)
          .values({ username, password: hashedPassword })
          .returning();
        const session = await lucia.createSession(insertedUser.id, {
          username,
        });
        const sessionCookie = lucia.createSessionCookie(session.id);
        auth_session.set({
          value: sessionCookie.value,
          ...sessionCookie.attributes,
        });
      })
      .guard(
        {
          beforeHandle: ({ user, session }) => {
            if (!user || !session) throw new InvalidSession();
          },
        },
        (app) =>
          app.post(
            "/sign-out",
            //FIXME : validation username / password
            async ({ cookie: { auth_session }, session }) => {
              await lucia.invalidateSession(session!.id);
              auth_session.remove();
            }
          )
      )
  );
