const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

const calculateBmi = (height: number, weight: number): string => {
  const result = weight / ((height / 100) ^ 2);
  const message = bmiStatus(result);
  return message;
};

const bmiStatus = (result: number): string => {
  switch (true) {
    case result <= 18.5:
      return "Underweight";
    case result >= 18.5 && result <= 24.9:
      return "Normal";
    case result >= 24.9 && result <= 39.9:
      return "Overweight";
    case result >= 40:
      return "Obese";
  }
  return "Wrong info";
};

console.log(calculateBmi(height, weight));

export default calculateBmi;
