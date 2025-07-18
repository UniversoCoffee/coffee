import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.APP_URL,
});

export const { signIn, signOut, signUp, useSession } = authClient;
