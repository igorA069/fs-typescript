export const calculateBmi = (height_cm: number, mass_kg: number): string => {
  const height_m = height_cm / 100;
  const bmi = mass_kg / (height_m * height_m);
  if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  }
  if (bmi < 17.0) {
    return "Underweight (Moderate thinness)";
  }
  if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  }
  if (bmi < 25.0) {
    return "Normal range";
  }
  if (bmi < 30.0) {
    return "Overweight (Pre-obese)";
  }
  if (bmi < 35.0) {
    return "Obese (Class I)";
  }
  if (bmi < 40.0) {
    return "Obese (Class II)";
  }
  return "Obese (Class III)";
};

const isMain = process.argv[1] === import.meta.filename;
if (isMain) {
  if (process.argv.length === 4) {
    const height_cm = Number(process.argv[2]);
    const mass_kg = Number(process.argv[3]);
    if (isNaN(height_cm) || isNaN(mass_kg)) {
      console.error("Provided arguments were not numbers");
    } else {
      console.log(calculateBmi(height_cm, mass_kg));
    }
  } else {
    console.error("height_cm and mass_kg must be passed as arguments");
  }
}
