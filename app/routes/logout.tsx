import type { Route } from "./+types/logout";
import normalizeLanguage from "~/utils/normalizeLanguage";

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { logout } = await import("~/utils/auth.server");
  const { lang } = params;
  const normalizedLang = normalizeLanguage(lang);

  return logout(request, normalizedLang);
};
