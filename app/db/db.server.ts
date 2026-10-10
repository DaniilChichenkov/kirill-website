import Database from "better-sqlite3";
import { createTables } from "./migrate.server";

const db = new Database("database.db");

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

createTables(db);

export default db;
