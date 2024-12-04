import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

//modern approach to this?
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const quotesPath = path.join(__dirname, "../data/quotes.json");
    const quotes = JSON.parse(fs.readFileSync(quotesPath, "utf8"));

    res.json(quotes);
  } catch (error) {
    console.error("Error loading quotes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
