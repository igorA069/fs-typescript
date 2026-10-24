import express, { json } from "express";

import { exercisesMiddleware } from "./src/middleware/exercisesMiddleware.ts";

import { calculateBmi } from "./src/bmiCalculator.ts";
import { calculateExercises } from "./src/exerciseCalculator.ts";

const app = express();

app.use(json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.post("/exercises", exercisesMiddleware, (req, res) => {
  const result = calculateExercises(req.body.daily_exercises, req.body.target);
  res.json(result);
});

app.set("query parser", "simple");
app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    res.json({
      weight,
      height,
      bmi: calculateBmi(height, weight),
    });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
