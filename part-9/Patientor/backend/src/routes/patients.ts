import express, { Request, Response, NextFunction } from "express";
import patientService from "../services/patientService";
import { NonSensetivePatients, Patient } from "../types";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { NewPatientSchema } from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensetivePatients[]>) => {
  res.send(patientService.getNonSensetivePatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const id = uuidv4();
    NewPatientSchema.parse({ ...req.body, id: id });
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, Patient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.use(errorMiddleware);

export default router;
