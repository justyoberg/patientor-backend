import express, { Response, Request } from 'express';
import patientsService from '../services/patientsService';
import { NonSensitivePatient, NewPatient } from '../types';
import newPatientParser from '../middleware/patientParser';
import errorHandler from '../middleware/errorHandler';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.use(errorHandler);
export default router;
