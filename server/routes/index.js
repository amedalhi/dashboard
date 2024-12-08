import express from "express";

import weatherAPI from "./weather.js";
import soccerAPI from "./soccer.js";
import quotesAPI from "./quotes.js";

const router = express.Router();

router.use("/weather", weatherAPI);
router.use("/soccer", soccerAPI);
router.use("/quotes", quotesAPI);

export default router;
