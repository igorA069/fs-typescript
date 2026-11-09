import express from "express";
import { type Response } from "express";

import diagnosesRouter from "./routes/diagnosesRoute.ts";
import patientsRouter from "./routes/patientsRoute.ts";

const app = express();
app.use(express.json());

app.get("/api/ping", (_req, res: Response<string>) => {
  res.send("pong");
  console.log("Received ping");
});

app.use("/api/diagnoses", diagnosesRouter);

app.use("/api/patients", patientsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
