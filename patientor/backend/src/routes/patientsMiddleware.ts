import type { Request, Response, NextFunction } from "express";

import { z } from "zod";

import { NewPatientSchema } from "../types.ts";

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (e) {
    next(e);
  }
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof z.ZodError) {
    res.status(400).json({ error: err.issues });
  } else {
    next(err);
  }
};
