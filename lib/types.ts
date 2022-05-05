export interface IPatientData {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
}

export interface IPatientCreate {
  name: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
}

export interface IPatientLogin {
  email: string;
  password: string;
}

export interface IPatientUpdate {
  passwordOld: string;
  password?: string;
  phone?: string;
}
