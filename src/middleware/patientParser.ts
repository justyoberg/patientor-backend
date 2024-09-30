import newPatientSchema from '../utils';
import { Request, Response, NextFunction } from 'express';

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    console.log(req.body);
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default newPatientParser;
