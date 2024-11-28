import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await fetch("https://api.football-data.org/v4/teams/", {
      headers: {
        "X-Auth-Token": "{API_KEY}",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching Man United data: ${response.statusText}`);
    }

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Error fetching Man United data:", error.message);
  }
});

export default router;
