import { Gender } from "./types";
import { z } from "zod";

export const NewPatientSchema = z.object({
  id: z.string(),
  name: z.string(),
  ssn: z.string(),
  dateOfBirth: z.string().date(),
  occupation: z.string(),
  gender: z.nativeEnum(Gender),
});
