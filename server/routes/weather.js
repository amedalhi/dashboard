import express from "express";
const router = express.Router();

import { CronJob } from "cron";

import "dotenv/config";
const API_KEY = process.env.WEATHER_API_KEY;

let weatherCache = {
  data: null,
  lastUpdated: null,
};

const fetchWeatherData = async function () {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=36.86&lon=-119.74&units=imperial&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`Error fetching weather data: ${response.statusText}`);
  }

  const data = await response.json();
  const {
    name: city,
    main: { temp },
  } = data;

  return { city, temp: Math.round(temp) };
};

const updateWeatherCache = async function () {
  try {
    const freshData = await fetchWeatherData();
    weatherCache = {
      data: freshData,
      lastUpdated: new Date(),
    };
    console.log("Weather cache updated:", new Date().toISOString());
  } catch (error) {
    console.error("Failed to update weather cache:", error.message);
  }
};

const weatherUpdateJob = new CronJob("0 * * * *", updateWeatherCache);
weatherUpdateJob.start();

router.get("/", async (req, res) => {
  try {
    const cacheAge = weatherCache.lastUpdated
      ? (new Date() - weatherCache.lastUpdated) / 1000 / 60 // in minutes
      : Infinity;

    if (!weatherCache.data || cacheAge >= 60) {
      await updateWeatherCache();
    }

    if (weatherCache.data) {
      return res.json(weatherCache.data);
    }

    const freshData = await fetchWeatherData();
    res.json(freshData);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

export default router;
