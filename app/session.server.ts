import { createCookieSessionStorage } from "react-router";

type SessionData = {
  isAuth: boolean;
};

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData>({
    cookie: {
      name: "__session",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      secrets: [sessionSecret],
      maxAge: 60 * 60 * 24 * 7,
    },
  });
