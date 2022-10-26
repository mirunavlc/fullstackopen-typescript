type WeightStatus =
  | "Low(underweight)"
  | "Normal(healthy weight)"
  | "High(overweight)";

const compareFloats = (small: number, big: number): boolean => {
  const result =
    big - small > Number.EPSILON && Math.abs(big - small) > Number.EPSILON;
  //   console.log(
  //     `Is ${big} greater then ${small}? ${
  //       big - small > Number.EPSILON && Math.abs(big - small) > Number.EPSILON
  //     }`
  //   );
  return result;
};

const calculateBmi = (height: number, weight: number): WeightStatus => {
  const bmi = weight / Math.pow(height / 100, 2);

  if (compareFloats(bmi, 18.5)) return "Low(underweight)";

  if (compareFloats(18.5, bmi) && compareFloats(bmi, 24.9))
    return "Normal(healthy weight)";

  if (compareFloats(24.9, bmi)) return "High(overweight)";

  throw new Error("Impossible calculation.");
};

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

try {
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
