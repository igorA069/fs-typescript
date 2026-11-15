import type { NewPatient } from "./types.ts";
import { Gender } from "./types.ts";

const parseString = (input: unknown): string => {
  if (typeof input === "string" || input instanceof String) {
    return String(input);
  }
  throw new Error(`${input} is not a string`);
};

const parseDate = (input: unknown): string => {
  const inputAsString = parseString(input);
  if (!isNaN(Date.parse(inputAsString))) {
    return inputAsString;
  }
  throw new Error(`${input} is not a date`);
};

const parseGender = (input: unknown): Gender => {
  const inputAsString = parseString(input);
  if ((Object.values(Gender) as string[]).includes(inputAsString)) {
    return inputAsString as Gender;
  }
  throw new Error(`${input} is not a Gender`);
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
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
    };
    return newPatient;
  } else {
    throw new Error("Invalid input data");
  }
};
