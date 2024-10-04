import { Gender, EntryType, HealthCheckRating } from './types';
import z from 'zod';

export const newPatientSchema = z.object({
  name: z.string().min(2, { message: 'Name must be atleast 2 characters' }),
  gender: z.nativeEnum(Gender),
  occupation: z.string(z.string()),
  ssn: z
    .string()
    .min(9, { message: 'SSN must be atleast 9 characters' })
    .optional(),
  dateOfBirth: z.string().date().optional(),
});

const baseEntrySchema = z.object({
  description: z.string().min(1, { message: 'Description required' }),
  date: z.string().date(),
  specialist: z.string().min(2, { message: 'Specialist required' }),
  diagnosisCodes: z.string().array().optional(),
});

const healthCheckSchema = z.object({
  type: z.literal(EntryType.HealthCheck),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const hospitalSchema = z.object({
  type: z.literal(EntryType.Hospital),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

const occupationalHealthcareSchema = z.object({
  type: z.literal(EntryType.OccupationalHealthcare),
  employerName: z
    .string()
    .min(2, { message: 'Employer name must be atleast 2 characters' }),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

export const newEntrySchema = z.discriminatedUnion('type', [
  baseEntrySchema.merge(healthCheckSchema).strict(),
  baseEntrySchema.merge(hospitalSchema).strict(),
  baseEntrySchema.merge(occupationalHealthcareSchema).strict(),
]);

export default {
  newPatientSchema,
  newEntrySchema,
};
