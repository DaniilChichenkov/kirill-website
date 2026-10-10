import { useFetcher, redirect } from "react-router";
import { Lock } from "lucide-react";
import type { Route } from "./+types/adminChangePassword";
import isLangShouldBeNormalized from "~/utils/isLangShouldBeNormalized";
import normalizeLanguage from "~/utils/normalizeLanguage";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { requireUser } = await import("~/utils/auth.server");
  const { lang } = params;

  // Check if authorized
  await requireUser(request, lang);

  if (isLangShouldBeNormalized(lang)) {
    const normalizedLang = normalizeLanguage(lang);
    return redirect(`/${normalizedLang}/bot-setup`);
  }

  return null;
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { requireUser } = await import("~/utils/auth.server");
  const { lang } = params;

  // Check if authorized
  await requireUser(request, lang);

  const formData = await request.formData();
  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");
  const confirmNewPassword = formData.get("confirmNewPassword");

  if (
    !currentPassword ||
    typeof currentPassword !== "string" ||
    !newPassword ||
    typeof newPassword !== "string" ||
    !confirmNewPassword ||
    typeof confirmNewPassword !== "string" ||
    newPassword !== confirmNewPassword
  ) {
    return { success: false, error: "badCredentials" };
  }

  const db = (await import("~/db/db.server")).default;
  const getAdminUser = (await import("~/db/admin/getAdminUser")).default;
  const bcrypt = await import("bcrypt");

  const salt = await bcrypt.genSalt(10);

  try {
    const admin = getAdminUser(db, "admin");
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      admin.password_hash,
    );

    if (!isPasswordCorrect) {
      return { success: false, error: "wrongCredentials" };
    }

    const updateAdminPassword = (await import("~/db/admin/updateAdminPassword"))
      .default;
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    updateAdminPassword(newPasswordHash);

    return { success: true };
  } catch (error) {
    return { success: false, error: "serverSideError" };
  }
};

const AdminChangePassword = () => {
  const fetcher = useFetcher<{ success: boolean; error: string }>();

  return (
    <section className="w-full flex flex-col items-center min-h-screen overflow-hidden overflow-y-scroll">
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 w-full">
          <div>
            <div className="max-w-prose md:max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                Change password
              </h2>

              <p className="mt-4 text-pretty text-gray-700">
                Update the password for your admin account.
              </p>

              <div className="card w-full md:w-96 bg-base-100 card-md shadow-sm rounded-none mt-5">
                <div className="card-body">
                  <div className="w-full flex justify-start items-center gap-x-5">
                    <div>
                      <div className="bg-blue-100 p-2 text-blue-500">
                        <Lock />
                      </div>
                    </div>
                    <div>
                      <h2 className="card-title">Password details</h2>
                      <p>Enter your current password to confirm this change.</p>
                    </div>
                  </div>
                  <fetcher.Form action="." method="POST">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">
                        Current password
                      </legend>
                      <input
                        type="password"
                        className="input"
                        placeholder="Enter a current password"
                        name="currentPassword"
                        required
                      />
                    </fieldset>
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">New Password</legend>
                      <input
                        type="password"
                        className="input"
                        placeholder="Enter a new password"
                        name="newPassword"
                        required
                      />
                    </fieldset>
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">
                        Confirm new password
                      </legend>
                      <input
                        type="password"
                        className="input"
                        placeholder="Repeat your new password"
                        name="confirmNewPassword"
                        required
                      />
                    </fieldset>
                    <div className="divider m-0 p-0 mt-3"></div>

                    {/* Feedback */}
                    {fetcher.data ? (
                      fetcher.data.success ? (
                        <p>Password updated</p>
                      ) : (
                        <p>An error occured</p>
                      )
                    ) : null}

                    <div className="justify-start card-actions mt-0 p-0">
                      {fetcher.state === "idle" ? (
                        <button className="cursor-pointer mt-5 flex items-center justify-center gap-2 border border-blue-500 bg-blue-500 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-600">
                          Update password
                        </button>
                      ) : (
                        <button
                          disabled
                          className="flex items-center justify-center gap-2 border border-blue-500 bg-blue-500 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-600"
                        >
                          <span className="loading loading-dots loading-sm"></span>
                        </button>
                      )}
                    </div>
                  </fetcher.Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminChangePassword;
