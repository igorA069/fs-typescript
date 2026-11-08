import express from "express";

const app = express();
app.use(express.json());

app.get("/ping", (_req, res: any) => {
  res.send("pong");
  console.log("Received ping");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
