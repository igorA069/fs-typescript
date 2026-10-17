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
  exerciseHours: number[],
  targetHoursPerDay: number,
): Result => {
  const exerciseHoursSum = exerciseHours.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
  );
  const periodLength = exerciseHours.length;
  const averageHoursPerDay = exerciseHoursSum / periodLength;
  const actualToTargetExerciseHoursPerDayRatio =
    averageHoursPerDay / targetHoursPerDay;

  let rating: number;
  let ratingDescription: string;
  if (actualToTargetExerciseHoursPerDayRatio < 0.6) {
    rating = 1;
    ratingDescription = "needs improvement";
  } else if (actualToTargetExerciseHoursPerDayRatio < 0.97) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "well done!";
  }

  return {
    periodLength,
    trainingDays: exerciseHours
      .map((hoursOfTraining) => (hoursOfTraining > 0 ? true : false))
      .filter((hasTrained) => hasTrained).length,
    success: averageHoursPerDay >= targetHoursPerDay,
    rating,
    ratingDescription,
    target: targetHoursPerDay,
    average: averageHoursPerDay,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
