// Should probs be a .env variable
const API_URL = 'https://therapist-finding-app.herokuapp.com/api/';

const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

// util function, don't export
async function _fetch(url: string, method: METHODS, body?: any) {
  const resp = await fetch(`${API_URL}${url}`, {
    method,
    body: JSON.stringify(body),
  });
  const data = await resp.json();
  return data;
}

export async function fetchTest() {
  return await _fetch('test/', METHODS.GET);
}

export async function fetchPatients() {
  return await _fetch('patients/', METHODS.GET);
}

export async function loginPatient(body: { email: string; password: string }) {
  return await _fetch('patients/validate', METHODS.PUT, body);
}

export async function createPatient(body: any) {
  return await _fetch('patients/', METHODS.POST, body);
}

export async function fetchPatientById(id: string) {
  return await _fetch('patients/' + id, METHODS.GET);
}

export async function updatePatientById(id: string, body: any) {
  return await _fetch('patients/' + id, METHODS.PATCH, body);
}

export async function deletePatientById(id: string) {
  return await _fetch('patients/' + id, METHODS.DELETE);
}
