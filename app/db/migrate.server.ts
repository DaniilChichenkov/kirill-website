import { type Database } from "better-sqlite3";

export function createTables(db: Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS bot_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),

      telegram_bot_token TEXT,
      telegram_bot_token_iv TEXT,
      telegram_bot_token_auth_tag TEXT,
      chat_id TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_enquiry_quiz_enquiry_id
    ON enquiry_quiz(enquiry_id);
  `);
}
