import express from "express";

import weatherAPI from "./weather.js";
import unitedAPI from "./united.js";
import soccerAPI from "./soccer.js";
import quotesAPI from "./quotes.js";

const router = express.Router();

router.use("/weather", weatherAPI);
// router.use("/united", unitedAPI);
// router.use("/soccer", soccerAPI);
router.use("/quotes", quotesAPI);

export default router;
