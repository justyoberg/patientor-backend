import schemas from '../utils';
import { Request, Response, NextFunction } from 'express';

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    schemas.newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const newEntryParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    schemas.newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default newPatientParser;
