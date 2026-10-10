import db from "../db.server";

export default function updateAdminPassword(newPasswordHash: string) {
  db.prepare(
    `
    UPDATE admin
    SET password_hash = ?
    WHERE id = 1
  `,
  ).run(newPasswordHash);
}
