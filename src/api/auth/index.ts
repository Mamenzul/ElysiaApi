import { Elysia, t } from "elysia";
import { userTable, usersInsertSchema } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";
import { lucia, validatePassword } from "@/lib/auth";
import { middleware } from "@/middleware";
import { BadCredentials, InvalidSession } from "@/lib/utils";

export const authRoutes = new Elysia().use(middleware).group(
  "/auth",
  {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String(),
    }),
  },
  (app) =>
    app
      .guard(
        {
          beforeHandle: ({ body }) => {
            const password = body.password;
            if (!validatePassword(password)) throw new BadCredentials();
          },
        },
        (app) =>
          app
            .post("sign-in", async ({ body, cookie: { auth_session } }) => {
              try {
                const { email, password } = body;
                const existingUser = await db.query.userTable.findFirst({
                  where: eq(userTable.email, email),
                });
                if (!existingUser) throw new BadCredentials();
                const validPassword = await new Argon2id().verify(
                  existingUser.password,
                  password
                );
                if (!validPassword) throw new BadCredentials();
                const session = await lucia.createSession(existingUser.id, {
                  email,
                });
                const sessionCookie = lucia.createSessionCookie(session.id);
                auth_session!.set({
                  value: sessionCookie.value,
                  ...sessionCookie.attributes,
                });
              } catch (e) {
                if (e instanceof Error) throw new BadCredentials();
              }
            })
            .post("sign-up", async ({ body, cookie: { auth_session } }) => {
              try {
                const { email, password } = body;
                const hashedPassword = await new Argon2id().hash(password);
                const [insertedUser] = await db
                  .insert(userTable)
                  .values({ email, password: hashedPassword })
                  .returning();
                if (!insertedUser) throw new BadCredentials();
                const session = await lucia.createSession(insertedUser.id, {
                  email,
                });
                const sessionCookie = lucia.createSessionCookie(session.id);
                auth_session!.set({
                  value: sessionCookie.value,
                  ...sessionCookie.attributes,
                });
              } catch (e) {
                if (e instanceof Error) {
                  throw new Error(e.message);
                }
              }
            })
      )

      .guard(
        {
          beforeHandle: ({ user, session }) => {
            if (!user || !session) throw new InvalidSession();
          },
        },
        (app) =>
          app.post(
            "sign-out",
            async ({ cookie: { auth_session }, session }) => {
              await lucia.invalidateSession(session!.id);
              auth_session!.remove();
            }
          )
      )
);
