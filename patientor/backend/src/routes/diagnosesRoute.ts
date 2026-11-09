import express from "express";
import type { Response } from "express";

import { getEntries } from "../services/diagnosesService.ts";
import type { Diagnosis } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<Array<Diagnosis>>) => {
  res.send(getEntries());
});

export default router;
