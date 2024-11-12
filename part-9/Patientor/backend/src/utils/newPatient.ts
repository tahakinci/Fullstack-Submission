import { Gender, Patient } from "../types";
import { z } from "zod";
import { NewEntrySchema } from "./newEntry";

export const NewPatientSchema = z.object({
  id: z.string(),
  name: z.string(),
  ssn: z.string(),
  dateOfBirth: z.string().date(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
  entries: z.array(NewEntrySchema),
});

export const toNewPatient = (object: unknown): Patient => {
  return NewPatientSchema.parse(object);
};
