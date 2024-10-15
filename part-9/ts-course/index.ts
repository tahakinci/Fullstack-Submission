import express from "express";
import calculateBmi from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (req, res) => {
  console.log(req.query);
  res.send("Hello FullStack");
});

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;

  if (weight && height) {
    const bmi = calculateBmi(+weight, +height);
    const result = {
      weight: weight,
      height: height,
      bmi: bmi,
    };
    res.send(result);
  } else {
    res.status(404).json({ error: "malformatted parametres" });
  }
});

app.post("/calculator", (req, res) => {
  const { exercises, target } = req.body;

  if (!exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
  } else {
    const result = calculateExercises(exercises, target);
    res.send(result);
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server runnşng on port ${PORT}`);
});
