import { z } from "zod";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// used for validation of new patient data received via HTTP request:
export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(["male", "female", "other"]),
  occupation: z.string(),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatient {
  id: string;
}

export type NonSensitivePatient = Omit<Patient, "ssn">;

export interface ErrorResponse {
  error: string | z.core.$ZodIssue[];
}
