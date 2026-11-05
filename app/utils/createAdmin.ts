import bcrypt from "bcrypt";
import db from "~/db/db.server";

import { createTables } from "~/db/migrate.server";

export async function createAdminUser() {
  try {
    createTables(db);

    const initialPassword = "12345";
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(initialPassword, salt);

    db.prepare(
      `
    INSERT OR IGNORE INTO admin (username, password_hash)
    VALUES (?, ?)
  `,
    ).run("admin", hash);

    console.log("Admin user created successfully");
  } catch (error) {
    console.log("Error when creating admin user");
    console.log(error);
  }
}

createAdminUser();
