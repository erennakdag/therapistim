export interface IPatientData {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  location: string | null;
  hasPrivateInsurance: boolean | null;
  insuranceProvider: string | null;
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
