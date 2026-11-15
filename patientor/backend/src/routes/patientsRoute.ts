import express from "express";
import { type Response } from "express";

import patientsService from "../services/patientsService.ts";

import type { Patient, NonSensitivePatient, ErrorResponse } from "../types.ts";

import { parseNewPatient } from "../utils.ts";

const router = express.Router();

router.get("/", (_req, res: Response<Array<NonSensitivePatient>>) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.post("/", (req, res: Response<Patient | ErrorResponse>) => {
  try {
    const patient = parseNewPatient(req.body);
    const result = patientsService.add(patient);
    res.send(result);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    }
  }
});

export default router;
