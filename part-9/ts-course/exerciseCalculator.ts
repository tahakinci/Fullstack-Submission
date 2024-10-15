import { isNotNumber } from "./utils/validation";

export type ResultObjectType = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

const argvs = process.argv;
const exercises = argvs.filter((day) => !isNotNumber(day)).map((a) => +a);

export const calculateExercises = (
  exercises: number[],
  target: number
): ResultObjectType => {
  const periotLength = exercises.length;
  const trainingDays = exercises.filter((d) => d > 0).length;
  const average = exercises.reduce((a, b) => a + b, 0) / periotLength;
  const isSuccess = average >= target;
  const rating = average / target < 0.5 ? 1 : average / target > 0.75 ? 3 : 2;
  const ratingDesc = rating === 1 ? "bad" : rating === 2 ? "okay" : "good";

  const resultObj = {
    periodLength: periotLength,
    trainingDays: trainingDays,
    success: isSuccess,
    rating: rating,
    ratingDescription: ratingDesc,
    target: target,
    average: average,
  };

  return resultObj;
};

console.log(calculateExercises(exercises, 2));
