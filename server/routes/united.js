import express from "express";
const router = express.Router();
import "dotenv/config";

const API_KEY = process.env.SOCCER_API_KEY;
//united info
const team = 66;

router.get("/", async (req, res) => {
  try {
    // Helper function to fetch match data by status
    const fetchMatches = async (status) => {
      try {
        const response = await fetch(
          `https://api.football-data.org/v4/teams/${team}/matches?status=${status}`,
          {
            headers: {
              "X-Auth-Token": `${API_KEY}`,
            },
          }
        );

        if (!response.ok) {
          // Log the issue but don't throw an error
          console.warn(
            `No matches found for status ${status}: ${response.statusText}`
          );
          return [];
        }

        const data = await response.json();
        // console.log(data);
        return data.matches;
      } catch (error) {
        // Log the error and return an empty array
        console.error(
          `Error fetching matches with status ${status}:`,
          error.message
        );
        return [];
      }
    };

    // Try fetching live matches first
    let matches = await fetchMatches("LIVE");

    // If no live matches, fetch the next scheduled match
    if (!matches.length) {
      matches = await fetchMatches("SCHEDULED");
    }
    console.log(matches);

    // If no matches found at all
    if (!matches.length) {
      return res.status(404).json({ error: "No matches found" });
    }

    // Get the first match (either live or scheduled)
    const nextMatch = matches[0];
    const matchDetails = {
      date: nextMatch.utcDate,
      homeTeam: nextMatch.homeTeam.shortName,
      awayTeam: nextMatch.awayTeam.shortName,
      status: nextMatch.status, // Indicates whether it's LIVE or SCHEDULED
    };

    res.json(matchDetails);
  } catch (error) {
    console.error("Error fetching match data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
