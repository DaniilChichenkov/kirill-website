import { type Database } from "better-sqlite3";

export default function getAdminUser(db: Database, username: string) {
  try {
    return db
      .prepare(
        `
      SELECT * FROM admin
      WHERE id = 1 AND username = ?
    `,
      )
      .get(username) as { username: string; password_hash: string };
  } catch (error) {
    throw new Error("errorWhenGettingAdminUser");
  }
}
