import express from "express";
import { pool } from "../db.js";

const router = express.Router();

/*
  GET /api/movies
  → Hakee kaikki katsotut elokuvat tietokannasta
*/

router.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM movies ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

/*
  POST /api/movies
  → Lisää uuden katsotun elokuvan
*/

router.post("/", async (req, res, next) => {
  try {
    const { title, year, poster_url } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Tarkistetaan onko elokuva jo tietokannassa
    const check = await pool.query(
      "SELECT id FROM movies WHERE title = $1 AND year = $2",
      [title, year]
    );

    if (check.rowCount > 0) {
      return res.status(400).json({ error: "Movie already exists" });
    }

    // Lisätään uusi elokuva tietokantaan
    const result = await pool.query(
      `INSERT INTO movies (title, year, poster_url) VALUES ($1, $2, $3) RETURNING *`,
      [title, year, poster_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/*
  DELETE /api/movies/:id
  → Poistaa elokuvan tietokannasta
*/

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM movies WHERE id = $1", [id]);
    res.json({ message: "Movie Deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
