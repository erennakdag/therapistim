import { executionAsyncResource } from 'async_hooks';
import axios from 'axios';

// Should probs be a .env variable
const API_URL = 'https://therapist-finding-app.herokuapp.com/';

// maps the urls for the API
export const urls = {
  get: {
    TEST: 'test/',
    GET_PATIENTS: 'patients/',
  },
  post: {
    VALIDATE_PATIENT: 'patients/validate/',
    CREATE_NEW_PATIENT: 'patients/new/',
    UPDATE_PATIENT: 'patients/update/',
  },
  delete: {
    DELETE_PATIENT: 'patients/delete/',
  },
};

// util functions to make API calls
export default {
  get: async (url: string) => {
    const response = await axios({
      method: 'GET',
      url: API_URL + url,
    });
    return response.data;
  },
  post: async (url: string, body: any) => {
    const response = await axios({
      method: 'POST',
      url: API_URL + url,
      data: body,
    });
    return response.data;
  },
  delete: async (url: string) => {
    const response = await axios({
      method: 'DELETE',
      url: API_URL + url,
    });
    return response.data;
  },
};
