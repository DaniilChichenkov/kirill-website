import { redirect } from "react-router";
import type { Route } from "./+types/admin";
import isLangShouldBeNormalized from "~/utils/isLangShouldBeNormalized";
import normalizeLanguage from "~/utils/normalizeLanguage";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { requireUser } = await import("~/utils/auth.server");
  const { lang } = params;

  // Check if authorized
  await requireUser(request, lang);

  if (isLangShouldBeNormalized(lang)) {
    const normalizedLang = normalizeLanguage(lang);
    return redirect(`/${normalizedLang}/dashboard`);
  }

  return null;
};

const AdminRoute = () => {
  return <div>enqu</div>;
};

export default AdminRoute;
