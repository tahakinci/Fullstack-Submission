import patients from "../../data/patients";
import { NonSensetivePatients, Patient } from "../types";

const getPatients = (): Patient[] => {
  return patients;
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

export default { getPatients, getNonSensetivePatients, addPatient };
