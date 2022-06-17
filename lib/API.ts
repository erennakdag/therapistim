import {
  IPatientCreate,
  IPatientData,
  ILogin,
  IPatientUpdate,
  ITherapistCreate,
  ITherapistData,
} from './types';
import axios from 'axios';

// Should probs be a .env variable
const API_URL = 'http://localhost:8080/api/';

const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

// Custom Error class to dispatch the status code to the components
class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number) {
    super();
    this.statusCode = statusCode;
  }
}

// util function, don't export
async function _fetch(url: string, method: METHODS, body?: any) {
  const resp = await fetch(`${API_URL}${url}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (resp.ok) {
    return await resp.json();
  } else {
    throw new HttpError(resp.status);
  }
}

export async function fetchTest() {
  return await _fetch('test/', METHODS.GET);
}

// PATIENT ENDPOINTS

export async function fetchPatients(): Promise<IPatientData[]> {
  return await _fetch('patients/', METHODS.GET);
}

export async function loginPatient(body: ILogin): Promise<IPatientData> {
  return await _fetch('patients/validate', METHODS.PUT, body);
}

export async function createPatient(
  body: IPatientCreate,
): Promise<IPatientData> {
  return await _fetch('patients/', METHODS.POST, body);
}

export async function fetchPatientById(id: string): Promise<IPatientData> {
  return await _fetch('patients/' + id, METHODS.GET);
}

export async function updatePatientById(
  id: string,
  body: IPatientUpdate,
): Promise<IPatientData> {
  return await _fetch('patients/' + id, METHODS.PATCH, body);
}

export async function updateForgottenPassword(
  body: ILogin,
): Promise<IPatientData> {
  return await _fetch('patients/', METHODS.PATCH, body);
}

export async function deletePatientById(id: string): Promise<IPatientData> {
  return await _fetch('patients/' + id, METHODS.DELETE);
}

// THERAPIST ENDPOINTS

export async function getAllTherapists(): Promise<ITherapistData[]> {
  return await _fetch('therapists', METHODS.GET);
}

export async function getTherapistById(id: string): Promise<ITherapistData> {
  return await _fetch('therapists/' + id, METHODS.GET);
}

export async function createTherapist(
  body: ITherapistCreate,
): Promise<ITherapistData> {
  return await _fetch('therapists/', METHODS.POST, body);
}

export async function loginTherapist(body: ILogin): Promise<ITherapistData> {
  return await _fetch('therapists/validate', METHODS.PUT, body);
}

export async function updateForgottenPasswordTherapist(
  body: ILogin,
): Promise<ITherapistData> {
  return await _fetch('therapists', METHODS.PATCH, body);
}

export async function searchTherapist(query: any): Promise<ITherapistData[]> {
  const resp = await axios.get(API_URL + 'therapists', {
    params: new URLSearchParams(query),
  });
  return resp.data;
}
