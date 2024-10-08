import {
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
  Entry,
} from '../types';
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = {
    id,
    entries: [],
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntryToPatient = (patient: Patient, entry: NewEntry): Entry => {
  const id: string = uuid();
  const newEntry = {
    id,
    ...entry,
  };

  const patientIndex = patients.indexOf(patient);
  patients[patientIndex].entries.push(newEntry);
  return newEntry;
};

export default {
  getPatient,
  getPatients,
  getNonSensitivePatients,
  addPatient,
  addEntryToPatient,
};
