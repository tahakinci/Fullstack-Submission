import express, { Request, Response, NextFunction } from "express";
import patientService from "../services/patientService";
import { Entry, NonSensetivePatients, Patient } from "../types";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { NewPatientSchema } from "../utils/newPatient";
import { toNewEntry } from "../utils/newEntry";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensetivePatients[]>) => {
  res.send(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(patientService.getPatient(id));
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

// const newEntityParser = (req: Request, _res: Response, next: NextFunction) => {
//   try {
//     const id = uuidv4();
//     NewEntrySchema.parse({ ...req.body, id: id });
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

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

router.post("/:id/entries", (req: Request<Entry>, res: Response) => {
  const { id } = req.params;
  const newId = uuidv4();
  const newEntry = toNewEntry({ id: newId, ...req.body });
  const updatedPatient = patientService.addEntity(id, newEntry);
  if (updatedPatient) {
    res.json(updatedPatient);
  } else {
    res.status(404).json();
  }
});
router.use(errorMiddleware);

export default router;
