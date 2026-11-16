import express from "express";
import { type Response } from "express";
import { ZodError } from "zod";

import type { Patient, NonSensitivePatient, ErrorResponse } from "../types.ts";
import { NewPatientSchema } from "../types.ts";

import patientsService from "../services/patientsService.ts";

const router = express.Router();

router.get("/", (_req, res: Response<Array<NonSensitivePatient>>) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.post("/", (req, res: Response<Patient | ErrorResponse>) => {
  try {
    const newPatient = NewPatientSchema.parse(req.body);
    const result = patientsService.add(newPatient);
    res.send(result);
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).json({ error: e.issues });
    }
    if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    }
  }
});

export default router;
