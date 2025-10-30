import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
import movieRoutes from "./routes/movies.js";

dotenv.config();
