import express from "express";
import routes from "./routes/index.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// app.get("/api/weather", async (req, res) => {
//   try {
//     const response = await fetch(
//       "https://api.openweathermap.org/data/2.5/weather?lat=36.74&lon=-119.77&units=imperial&appid=57d38405c8bc272d90c7bc1a73396123"
//     );

//     if (!response.ok) {
//       throw new Error(`Error fetching weather data: ${response.statusText}`);
//     }

//     const data = await response.json();
//     const {
//       name: city,
//       main: { temp },
//     } = data;

//     // Send the response
//     res.json({ city, temp: Math.round(temp) });
//   } catch (error) {
//     console.error("Error fetching weather data:", error.message);
//     res.status(500).json({ error: "Failed okay to fetch weather data" });
//   }
// });
