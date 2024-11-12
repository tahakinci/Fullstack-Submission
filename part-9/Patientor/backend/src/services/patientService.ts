import patients from "../../data/patients";
import { Entry, NonSensetivePatients, Patient } from "../types";
const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);
  console.log(patient);
  if (!patient) throw new Error(`no patient has fount with id of '${id}'`);
  return patient;
};

const getNonSensetivePatients = (): NonSensetivePatients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: Patient): Patient => {
  patients.push(patient);
  return patient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addEntity = (id: string, entry: Entry): Patient => {
  const patient = findById(id);
  if (!patient) throw new Error(`Couldn't find patient with id ${id}`);
  patient.entries.push(entry);
  return patient;
};

export default {
  getPatients,
  getNonSensetivePatients,
  addPatient,
  getPatient,
  addEntity,
};
