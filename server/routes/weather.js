import express from "express";
import "dotenv/config";
const router = express.Router();

const API_KEY = process.env.WEATHER_API_KEY;

router.get("/", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=36.74&lon=-119.77&units=imperial&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    const data = await response.json();
    const {
      name: city,
      main: { temp },
    } = data;

    // Send the response
    res.json({ city, temp: Math.round(temp) });
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Failed okay to fetch weather data" });
  }
});

export default router;
