import { Argon2id } from "oslo/password";
import { lucia } from "../../lib/auth.js";
import { usersInsertSchema, userTable } from "../../lib/db/schema.js";
import { Elysia } from "elysia";
import { db } from "../../lib/db/index.js";
export const signupRoutes = new Elysia({ prefix: "/signup" })
  .onError(({ error }) => {
    return new Response(error.toString());
  })
  .post(
    "/",
    //FIXME : validation username / password + code d'erreur
    async ({ body, set }) => {
      const { username, password } = body;
      const hashedPassword = await new Argon2id().hash(password);
      const [insertedUser] = await db
        .insert(userTable)
        .values({ username, password: hashedPassword })
        .returning();
      if (!insertedUser) throw new Error("Username is already taken");
      const session = await lucia.createSession(insertedUser.id, {});
      set.headers["Set-Cookie"] = lucia
        .createSessionCookie(session.id)
        .serialize();
    },
    {
      body: usersInsertSchema,
    }
  );
