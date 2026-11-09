import type { Patient, NonSensitivePatient } from "../types.ts";

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

export default {
  getEntries,
  getNonSensitiveEntries,
};
