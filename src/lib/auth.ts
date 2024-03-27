import { Lucia } from "lucia";
import { type Users } from "@/db/schema";
import { adapter } from "@/db";
// your adapter

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Pick<Users, "username">;
  }
}

export function validatePassword(password : string) {
  // Define constraints
  const minLength = 8; // Minimum length of password
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  
  // Check if password meets constraints
  if (
      password.length < minLength ||
      !hasSpecialChar ||
      !hasNumber ||
      !hasUppercase ||
      !hasLowercase
  ) {
      return false; // Password is invalid
  }

  return true; // Password is valid
}