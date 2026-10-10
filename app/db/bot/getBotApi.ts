import db from "../db.server";

export default function getBotApi() {
  return db
    .prepare(
      `
       SELECT * FROM bot_settings WHERE id = 1
      `,
    )
    .get() as {
    telegram_bot_token: string;
    telegram_bot_token_iv: string;
    telegram_bot_token_auth_tag: string;
    chat_id: string;
  };
}
