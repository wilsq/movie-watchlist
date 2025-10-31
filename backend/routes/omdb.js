import express from "express";
import axios from "axios";

const router = express.Router();

/*
  GET /api/omdb?title=
  → Hakee elokuvia OMDb API:sta
*/

router.get("/", async (req, res, next) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ error: "Missing title query parameter" });
    }

    const apiKey = process.env.OMDB_API_KEY;

    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        apiKey: apiKey,
        s: title,
      },
    });

    if (response.data.Response === "False") {
      return res.status(400).json({ error: response.data.Error });
    }

    res.json(response.data.Search);
  } catch (err) {
    next(err);
  }
});

export default router;
