import type { RequestHandler } from "express";
import type * as core from "express-serve-static-core";

import type { ExerciseRequest } from "../types.ts";
import type { CalculateExerciseResult } from "../exerciseCalculator.ts";

interface ErrorType {
  error: string;
}

export const exercisesMiddleware: RequestHandler<
  core.ParamsDictionary,
  ErrorType | CalculateExerciseResult,
  ExerciseRequest
> = (req, res, next) => {
  // because req.body is not guaranteed to be of type ExerciseRequest from the start, broaden its type at first
  const unsafeReqBody = req.body as unknown as Record<string, unknown>;

  // check that the body includes daily_exercises and target
  if (
    unsafeReqBody.daily_exercises === undefined ||
    unsafeReqBody.daily_exercises === null ||
    unsafeReqBody.target === undefined ||
    unsafeReqBody.target === null
  ) {
    res.status(400).json({
      error: "parameters missing",
    });
    return;
  }
  const { daily_exercises, target } = unsafeReqBody;

  // check that daily_exercises is an array of numbers
  if (!Array.isArray(daily_exercises)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }
  const daily_exercises_as_number = daily_exercises.map((item) => Number(item));
  if (daily_exercises_as_number.some((item) => isNaN(item))) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  // check that target is a number
  const target_as_number = Number(target);
  if (isNaN(target_as_number)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }
  req.body.daily_exercises = daily_exercises_as_number;
  req.body.target = target_as_number;

  next();
};
