import axios from "axios";

const API_URL = "https://therapist-finding-app.herokuapp.com/";

export const urls = {
  TEST: "test",
  GET_ALL_PATIENTS: "patients",
  CREATE_NEW_PATIENT: "patients/new",
};

export default {
  get: async (url: string) => {
    const response = await axios({
      method: "GET",
      url: API_URL + url,
    });
    return response.data;
  },
  post: async (url: string, body: any) => {
    const response = await axios({
      method: "POST",
      url: API_URL + url,
      data: body,
    });
    return response.data;
  },
};
