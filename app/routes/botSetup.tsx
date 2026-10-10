import React from "react";
import type { Route } from "./+types/botSetup";
import isLangShouldBeNormalized from "~/utils/isLangShouldBeNormalized";
import normalizeLanguage from "~/utils/normalizeLanguage";
import { redirect, useFetcher } from "react-router";
import { Bot } from "lucide-react";

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
  await import("dotenv/config");

  // Check if authorized
  await requireUser(request, lang);

  const formData = await request.formData();
  const botApiKey = formData.get("botApi");
  const chatId = formData.get("chatId");

  if (
    !botApiKey ||
    typeof botApiKey !== "string" ||
    !chatId ||
    typeof chatId !== "string"
  ) {
    return { success: false, error: "noKeyProvided" };
  }

  // Encrypt API key
  const { encrypt } = await import("~/utils/encryptKey");

  let encryptedApiToken;
  try {
    encryptedApiToken = encrypt(botApiKey);
  } catch (error) {
    return { success: false, error: "serverSideError" };
  }

  try {
    const setBotApiKey = (await import("~/db/bot/setBotApi")).default;
    setBotApiKey(encryptedApiToken, chatId);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "serverSideError" };
  }
};

const BotSetup = () => {
  const fetcher = useFetcher<{ success: boolean; error?: string }>();

  return (
    <section className="w-full flex flex-col items-center min-h-screen overflow-hidden overflow-y-scroll">
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 w-full">
          <div>
            <div className="max-w-prose md:max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                Telegram bot
              </h2>

              <p className="mt-4 text-pretty text-gray-700">
                Manage the API key for your Telegram integration.
              </p>

              <div className="card w-full md:w-96 bg-base-100 card-md shadow-sm rounded-none mt-5">
                <div className="card-body">
                  <div className="w-full flex justify-start items-center gap-x-5">
                    <div>
                      <div className="bg-blue-100 p-2 text-blue-500">
                        <Bot size={30} />
                      </div>
                    </div>
                    <div>
                      <h2 className="card-title">Bot Connection</h2>
                      <p>Add the API key for the bot you want to use.</p>
                    </div>
                  </div>
                  <fetcher.Form action="." method="POST">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Bot API key</legend>
                      <input
                        type="password"
                        className="input"
                        placeholder="**************"
                        name="botApi"
                        required
                      />
                    </fieldset>
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Chat ID</legend>
                      <input
                        type="text"
                        className="input"
                        placeholder="Type Chat ID here"
                        name="chatId"
                        required
                      />
                      <p>
                        {fetcher.data
                          ? fetcher.data.success
                            ? "API key saved"
                            : "An error occured"
                          : null}
                      </p>
                    </fieldset>
                    <div className="divider m-0 p-0 mt-3"></div>
                    <div className="justify-start card-actions mt-0 p-0">
                      {fetcher.state === "idle" ? (
                        <button className="cursor-pointer mt-5 flex items-center justify-center gap-2 border border-blue-500 bg-blue-500 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-600">
                          Save settings
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

export default BotSetup;
