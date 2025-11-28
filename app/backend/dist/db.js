import path from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, "../todo.db");
const db = new sqlite.Database(DB_PATH, (err) => {
    if (err) {
        console.error("DB Error:", err);
    }
    else {
        console.log("Connected to SQLite database");
    }
});
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  );`);
    db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    title TEXT,
    completed INTEGER DEFAULT 0,
    FOREIGN KEY(userId) REFERENCES users(id)
  );`);
});
export default db;
