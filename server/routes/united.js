import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await fetch("https://api.football-data.org/v4/teams/", {
      headers: {
        "X-Auth-Token": "09456ae70aea42788ef40b1fa01d5b20",
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
