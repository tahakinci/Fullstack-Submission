import express from "express";
// eslint-disable-next-line @typescript-eslint/no-require-imports
import cors = require("cors");
import diagnoseRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";
const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
