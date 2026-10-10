import { NavBar, Form } from "~/components/login";
import type { Route } from "./+types/login";
import bcrypt from "bcrypt";
import normalizeLanguage from "~/utils/normalizeLanguage";
import isLangShouldBeNormalized from "~/utils/isLangShouldBeNormalized";
import { redirect } from "react-router";
import getClientIp from "~/utils/getClientIp";
import {
  clearLoginAttempts,
  isLoginBlocked,
  recordFailedLogin,
} from "~/utils/rateLimit";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { lang } = params;

  if (isLangShouldBeNormalized(lang)) {
    const normalizedLang = normalizeLanguage(lang);
    return redirect(`/${normalizedLang}/login`, { status: 301 });
  }
  return null;
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  // Check rate limit
  const ip = getClientIp(request);

  if (isLoginBlocked(ip)) {
    return {
      success: false,
      error: "rateLimited",
    };
  }

  // Get form data
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  // Validate credentials
  if (
    !username ||
    typeof username !== "string" ||
    !password ||
    typeof password !== "string"
  ) {
    return {
      success: false,
      error: "badCredentials",
    };
  }

  // Import DB modules
  const getAdminUser = (await import("~/db/admin/getAdminUser")).default;
  const db = (await import("~/db/db.server")).default;

  // Get admin
  const admin = getAdminUser(db, username);

  if (!admin) {
    return {
      success: false,
      error: "badCredentials",
    };
  }

  // Compare hash
  const isPasswordCorrect = await bcrypt.compare(password, admin.password_hash);

  if (!isPasswordCorrect) {
    // Record rate-limiting
    recordFailedLogin(ip);

    return {
      success: false,
      error: "badCredentials",
    };
  } else {
    // Clear rate-limit
    clearLoginAttempts(ip);

    const { createUserSession } = await import("~/utils/auth.server");

    // Normalize language param before redirecting
    const { lang } = params;
    const normalizedLang = normalizeLanguage(lang);

    return createUserSession(`/${normalizedLang}/dashboard`);
  }
};

const LoginRoute = ({ actionData }: Route.ComponentProps) => {
  return (
    <div className="bg-blue-50 flex flex-col min-h-screen">
      <NavBar />
      <Form error={actionData?.error} success={actionData?.success} />
    </div>
  );
};

export default LoginRoute;
