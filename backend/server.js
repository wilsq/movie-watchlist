import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
import movieRoutes from "./routes/movies.js";

// lataa .env-tiedoston muuttujat
dotenv.config();

const app = express();

// Middlewaret
app.use(cors());
app.use(express.json());

// Testireitti
app.get("/", (req, res) => {
  res.send("Movie watchlist API is running");
});

app.use("/api/movies", movieRoutes);

app.use((err, req, res, next) => {
  console.error("Server error", err);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ Connected to PostgreSQL");
  } catch (err) {
    console.error("❌ Database connection failed", err);
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
