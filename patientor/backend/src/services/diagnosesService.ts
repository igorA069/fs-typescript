import diagnoses from "../../data/diagnoses.ts";
import type { Diagnosis } from "../types.ts";

export const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};
