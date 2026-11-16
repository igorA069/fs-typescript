import express from "express";
import type { Request, Response } from "express";

import { newPatientParser, errorHandler } from "./patientsMiddleware.ts";

import type {
  NewPatient,
  Patient,
  NonSensitivePatient,
  ErrorResponse,
} from "../types.ts";

import patientsService from "../services/patientsService.ts";

const router = express.Router();

router.get("/", (_req, res: Response<Array<NonSensitivePatient>>) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatient>,
    res: Response<Patient | ErrorResponse>,
  ) => {
    const result = patientsService.add(req.body);
    res.json(result);
  },
);

router.use(errorHandler);

export default router;
