import express from "express";
import "dotenv/config";

const router = express.Router();
const API_KEY = process.env.SOCCER_API_KEY;
const TEAM_ID = "66";

const fetchMatches = async (status) => {
  const response = await fetch(
    `https://api.football-data.org/v4/teams/${TEAM_ID}/matches?status=${status}`,
    {
      headers: { "X-Auth-Token": API_KEY },
    }
  );
  return response.json();
};

const isMatchToday = (match) => {
  const matchDate = new Date(match.utcDate);
  const today = new Date();
  return (
    matchDate.getDate() === today.getDate() &&
    matchDate.getMonth() === today.getMonth() &&
    matchDate.getFullYear() === today.getFullYear()
  );
};

const formatMatchDetails = (matchData) => {
  const match = matchData.matches ? matchData.matches[0] : matchData;

  return {
    matchDate: match.utcDate,
    homeTeam: match.homeTeam.shortName,
    awayTeam: match.awayTeam.shortName,
    homeScore: match.score.fullTime.home,
    awayScore: match.score.fullTime.away,
  };
};

router.get("/", async (req, res) => {
  try {
    const liveData = await fetchMatches("LIVE");
    if (liveData.resultSet.count > 0) {
      return res.json(formatMatchDetails(liveData));
    }

    const finishedData = await fetchMatches("FINISHED");
    const todayMatch = finishedData.matches.find(isMatchToday);
    if (todayMatch) {
      return res.json(formatMatchDetails({ matches: [todayMatch] }));
    }

    const scheduledData = await fetchMatches("SCHEDULED");
    if (scheduledData.matches.length > 0) {
      return res.json(formatMatchDetails(scheduledData));
    }

    res.status(404).json({ error: "No matches found" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
