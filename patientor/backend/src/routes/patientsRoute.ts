import express from "express";
import { type Response } from "express";

import patientsService from "../services/patientsService.ts";

import type { Patient, NonSensitivePatient } from "../types.ts";

import { parseNewPatient } from "../utils.ts";

const router = express.Router();

router.get("/", (_req, res: Response<Array<NonSensitivePatient>>) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.post("/", (req, res: Response<Patient>) => {
  const patient = parseNewPatient(req.body);
  const result = patientsService.add(patient);
  res.send(result);
});

export default router;
