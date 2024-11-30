import express from "express";

import weatherAPI from "./weather.js";
import unitedAPI from "./united.js";
import soccerAPI from "./soccer.js";

const router = express.Router();

router.use("/weather", weatherAPI);
router.use("/united", unitedAPI);
router.use("/soccer", soccerAPI);

export default router;
