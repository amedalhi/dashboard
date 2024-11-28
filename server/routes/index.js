import express from "express";

import weatherAPI from "./weather.js";

const router = express.Router();

router.use("/weather", weatherAPI);

export default router;
