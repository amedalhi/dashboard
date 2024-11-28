import express from "express";

import weatherAPI from "./weather.js";
import unitedAPI from "./united.js";

const router = express.Router();

router.use("/weather", weatherAPI);
router.use("/united", unitedAPI);

export default router;
