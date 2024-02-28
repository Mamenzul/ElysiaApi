import { Argon2id } from "oslo/password";
import { lucia } from "../../lib/auth.js";
import { usersInsertSchema, userTable } from "../../lib/db/schema.js";
import { Elysia } from "elysia";
import { db } from "../../lib/db/index.js";
import { eq } from "drizzle-orm";
export const loginRoutes = new Elysia({ prefix: "/login" })
  .onError(({ error }) => {
    return new Response(error.toString());
  })
  .post(
    "/",
    async ({ body, set }) => {
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
      const session = await lucia.createSession(existingUser.id, {});
      set.headers["Set-Cookie"] = lucia
        .createSessionCookie(session.id)
        .serialize();
    },
    {
      body: usersInsertSchema,
    }
  );

// take username password from request
//validate
//check if user exist
//create session cookie
