import { type NewPatient } from "./types.ts";

const parseString = (input: unknown): string => {
  if (!input || (typeof input !== "string" && !(input instanceof String))) {
    throw new Error(`${input} is not a string`);
  }
  return input.toString();
};

const parseDate = (input: unknown): string => {
  const parsedInput = parseString(input);
  if (!Date.parse(parsedInput)) {
    throw new Error(`${input} is not a date`);
  }
  return parsedInput;
};

export const parseNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Invalid patient properties");
  }
  if (
    "ssn" in object &&
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      ssn: parseString(object.ssn),
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseString(object.gender),
      occupation: parseString(object.occupation),
    };
    return newPatient;
  } else {
    throw new Error("Invalid input data");
  }
};
