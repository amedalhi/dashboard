import express from "express";
const router = express.Router();
import "dotenv/config";

const API_KEY = process.env.SOCCER_API_KEY;
//united info
const team = 66;

router.get("/", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/teams/66/matches?status=SCHEDULED",
      {
        headers: {
          "X-Auth-Token": `${API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching Man United data: ${response.statusText}`);
    }

    const data = await response.json();

    const nextMatch = data.matches[0];

    if (!nextMatch) {
      return res.status(404).json({ error: "No matches found" });
    }

    const matchDetails = {
      date: nextMatch.utcDate,
      homeTeam: nextMatch.homeTeam.shortName,
      awayTeam: nextMatch.awayTeam.shortName,
    };

    res.json(matchDetails);
  } catch (error) {
    console.error("Error fetching Man United data:", error.message);
  }
});

export default router;
