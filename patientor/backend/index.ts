import express from "express";
import { type Response } from "express";

import diagnosesRouter from "./src/routes/diagnosesRoute.ts";

const app = express();
app.use(express.json());

app.get("/api/ping", (_req, res: Response<string>) => {
  res.send("pong");
  console.log("Received ping");
});

app.use("/api/diagnoses", diagnosesRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
