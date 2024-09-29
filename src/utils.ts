import { NewPatient, Gender } from './types';

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Error: invalid parameters');
  }

  if ('name' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
    };
    if ('ssn' in object) {
      newPatient.ssn = parseSsn(object.ssn);
    }
    if ('dateOfBirth' in object) {
      newPatient.dateOfBirth = parseDate(object.dateOfBirth);
    }

    return newPatient;
  }

  throw new Error('Error: missing parameters');
};

const parseString = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error(`Error: parameter '${param}' expected to be a string`);
  }
  return param;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !isSsn(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isSsn = (ssn: string): boolean => {
  const regex = new RegExp('[A-Z0-9]{6}-[A-Z0-9]{3,4}');
  return regex.test(ssn);
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map(v => v.toString())
    .includes(gender);
};

export default toNewPatient;
