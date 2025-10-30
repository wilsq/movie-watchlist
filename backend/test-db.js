import { pool } from "./db.js";

try {
  const res = await pool.query("SELECT NOW()");
  console.log("✅ DB Connection OK: ", res.rows[0]);
} catch (err) {
  console.error("❌ DB Connection FAILED", err.message);
} finally {
  await pool.end();
}
