import { Gender } from './types';
import z from 'zod';

export const newPatientSchema = z.object({
  name: z.string().min(1, { message: 'Name must be atleast 1 character' }),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  ssn: z
    .string()
    .min(9, { message: 'SSN must be atleast 9 characters' })
    .optional(),
  dateOfBirth: z.string().date().optional(),
});

export default newPatientSchema;
