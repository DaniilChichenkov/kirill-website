import db from "../db.server";

export default function setBotApiKey(
  encryptedData: {
    encrypted: string;
    iv: string;
    authTag: string;
  },
  chatId: string,
) {
  const isBotSettingsExists = db
    .prepare(`SELECT * FROM bot_settings WHERE id = 1`)
    .get();

  if (!isBotSettingsExists) {
    db.prepare(
      `
      INSERT INTO bot_settings (telegram_bot_token, telegram_bot_token_iv, telegram_bot_token_auth_tag, chat_id)
      VALUES (?, ?, ?, ?)
    `,
    ).run(
      encryptedData.encrypted,
      encryptedData.iv,
      encryptedData.authTag,
      chatId,
    );
  } else {
    db.prepare(
      `
      UPDATE bot_settings
      SET
        telegram_bot_token = ?,
        telegram_bot_token_iv = ?,
        telegram_bot_token_auth_tag = ?,
        chat_id = ?
      WHERE id = 1
    `,
    ).run(
      encryptedData.encrypted,
      encryptedData.iv,
      encryptedData.authTag,
      chatId,
    );
  }
}
