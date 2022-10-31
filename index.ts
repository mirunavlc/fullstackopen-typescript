import express = require("express");
import { calculateBmi, Result } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
import bodyParser from "body-parser";
const jsonParser = bodyParser.json();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  try {
    const bmi = calculateBmi(height, weight);
    const result: Result = { height: height, weight: weight, bmi: bmi };
    res.send(result);
  } catch (error: unknown) {
    res.send({ error: "malformatted parameters" });
  }
});

app.post("/exercises", jsonParser, (req, res) => {
  try {
    /* eslint-disable */
    const body = req.body;
    const daily_exercises: number[] = body.daily_exercises.map((s: string) =>
      Number(s)
    );
    const target = Number(body.target);
    const result = calculateExercises(daily_exercises, target);
    res.send(result);
    /* eslint-enable */
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      res.send({ error: "malformatted parameters" });
    } else {
      res.send({ error: "parameters missing" });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
