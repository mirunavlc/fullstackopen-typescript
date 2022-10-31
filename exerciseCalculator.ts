interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExcerciseHours: Array<number>,
  targetHours: number
): Result => {
  const compareFloats = (small: number, big: number): boolean => {
    const result =
      big - small > Number.EPSILON && Math.abs(big - small) > Number.EPSILON;
    return result;
  };

  const average =
    dailyExcerciseHours.reduce((sum, h) => sum + h, 0) /
    dailyExcerciseHours.length;
  const rating = compareFloats(targetHours, average)
    ? 3
    : compareFloats(targetHours - average, 0.5)
    ? 2
    : 1;
  return {
    periodLength: dailyExcerciseHours.length,
    trainingDays: dailyExcerciseHours.filter((h) => h != 0).length,
    success: !compareFloats(average, targetHours),
    rating: rating,
    ratingDescription:
      rating === 1
        ? "Not good enough, you need better discipline"
        : rating === 2
        ? "not too bad but could be better"
        : "Good job, keep it up!",
    target: targetHours,
    average: average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
