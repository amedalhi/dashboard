import express from "express";
const router = express.Router();

import "dotenv/config";
const API_KEY = process.env.SOCCER_API_KEY;

//team info
const team = "66";

router.get("/", async (req, res) => {
  try {
    const fetchMatches = async (status) => {
      const response = await fetch(
        `https://api.football-data.org/v4/teams/${team}/matches?status=${status}`,
        {
          headers: {
            "X-Auth-Token": `${API_KEY}`,
          },
        }
      );

      const data = await response.json();
      return data;
    };

    let matchData = await fetchMatches("LIVE");

    if (matchData.resultSet.count === 0) {
      matchData = await fetchMatches("SCHEDULED");
    }

    const match = matchData.matches[0];
    const matchDetails = {
      matchDate: match.utcDate,
      homeTeam: match.homeTeam.shortName,
      awayTeam: match.awayTeam.shortName,
      homeScore: match.score.fullTime.homeTeam,
      awayScore: match.score.fullTime.awayTeam,
    };

    res.json(matchDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
