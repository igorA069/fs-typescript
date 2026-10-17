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

if (process.argv.length < 4) {
  console.log(
    "You must provide at least 2 command line arguments (targetHoursPerDay and exerciseHours for at least one day)",
  );
} else {
  const targetHoursPerDay = Number(process.argv[2]);
  const exerciseHours = process.argv.slice(3).map((arg) => Number(arg));
  console.log(calculateExercises(exerciseHours, targetHoursPerDay));
}
