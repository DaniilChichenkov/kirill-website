import { redirect } from "react-router";
import { getSession, commitSession, destroySession } from "~/session.server";
import normalizeLanguage from "./normalizeLanguage";

export async function requireUser(request: Request, lang: string) {
  const session = await getSession(request.headers.get("Cookie"));

  const isAuth = session.get("isAuth");

  if (isAuth !== true) {
    const normalizedLanguage = normalizeLanguage(lang);
    throw redirect(`/${normalizedLanguage}/login`);
  }
}

export async function createUserSession(redirectTo = "/dashboard") {
  const session = await getSession();
  session.set("isAuth", true);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function logout(request: Request, lang: string) {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect(`/${lang}/login`, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
