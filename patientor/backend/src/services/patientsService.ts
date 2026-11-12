import type { Patient, NonSensitivePatient, NewPatient } from "../types.ts";
import { v1 as uuid1 } from "uuid";

import patients from "../../data/patients.ts";

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
  return patients.map((patient) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...rest } = patient;
    return rest;
  });
};

const add = (patient: NewPatient): Patient => {
  const newPatient: Patient = { ...patient, id: uuid1() };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  add,
};
