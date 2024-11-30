import express from "express";
const router = express.Router();

import "dotenv/config";
const API_KEY = process.env.SOCCER_API_KEY;

//team info
const team = "66"; //Manchester United ID

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

    let matches = await fetchMatches("SCHEDULED");
    console.log(matches.matches);

    res.json(matches);
  } catch (error) {
    res.status(500).json({ errro: "EEEEEEk" });
  }
  //if live, pass live status to function
  //else pass scheduled
});

export default router;
