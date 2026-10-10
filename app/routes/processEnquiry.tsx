import type { Route } from "./+types/processEnquiry";
import normalizeLanguage from "~/utils/normalizeLanguage";
import userFriendlyLanguage from "~/utils/userFriendlyLanguage";

export const action = async ({ request, params }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { lang } = params;
  const normalizedLanguage = normalizeLanguage(lang);
  const languageInFriendlyFormat = userFriendlyLanguage(normalizedLanguage);
  await import("dotenv/config");

  const name = formData.get("name");
  const email = formData.get("email");
  const tel = formData.get("tel");
  const answers = formData.get("answers");

  if (
    !name ||
    typeof name !== "string" ||
    !email ||
    typeof email !== "string" ||
    !tel ||
    typeof tel !== "string" ||
    !answers ||
    typeof answers !== "string"
  ) {
    return { success: false, error: "badRequest" };
  }

  // Parse JSON
  let answersForDB: Record<string, string>[];
  try {
    const parsedAnswers = JSON.parse(answers);
    answersForDB = parsedAnswers;
  } catch (error) {
    return { success: false, error: "badRequest" };
  }

  // Send message to telegram bot
  try {
    const sendNotificationThroughBot = (
      await import("~/utils/sendNotificationThroughBot")
    ).default;
    const { decrypt } = await import("~/utils/encryptKey");
    const getBotApi = (await import("~/db/bot/getBotApi")).default;

    // Construct a message
    const message = `━━━━━━━━━━━━━━━━━━━━
<b>New request</b>
━━━━━━━━━━━━━━━━━━━━

<b>Name:</b> ${name}
<b>Tel:</b> ${tel}
<b>Email:</b> ${email}
<b>Language:</b> ${languageInFriendlyFormat}

${answersForDB
  .map(
    (question) => `<b>${question.question}:</b>
${question.answer}`,
  )
  .join("\n\n-----\n\n")}

━━━━━━━━━━━━━━━━━━━━`;

    const botApi = getBotApi();
    const decryptedToken = decrypt(
      botApi.telegram_bot_token,
      botApi.telegram_bot_token_iv,
      botApi.telegram_bot_token_auth_tag,
    );
    await sendNotificationThroughBot(decryptedToken, botApi.chat_id, message);

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "serverSideError" };
  }
};
