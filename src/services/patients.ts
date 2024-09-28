import { Patient } from '../types';
import patients from '../../data/patients';

const getPatients = (): Patient[] => {
  return patients;
};

export default {
  getPatients,
};
