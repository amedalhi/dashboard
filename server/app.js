import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
const port = 3000;

app.use(cors({ origin: "http://localhost:4321" }));

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
