import express from "express";
import { type Response } from "express";

import patientsService from "../services/patientsService.ts";
import { type NonSensitivePatient } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<Array<NonSensitivePatient>>) => {
  res.send(patientsService.getNonSensitiveEntries());
});

export default router;
