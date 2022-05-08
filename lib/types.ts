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

export interface ILogin {
  email: string;
  password: string;
}

export interface IPatientUpdate {
  passwordOld: string;
  password?: string;
  phone?: string;
}

export interface ITherapistData {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  bio: string;
  adress: string;
  institutionName?: string;
  languages: string[];
  specialties: string[];
  canWriteMedication: boolean;
  website?: string;
  latitude: number;
  longitude: number;
  acceptsPrivateInsurance: boolean;
}

export interface ITherapistCreate {
  name: string;
  email: string;
  password: string;
  phone: string;
  bio: string;
  adress: string;
  institutionName?: string;
  languages: string[];
  specialties: string[];
  canWriteMedication: boolean;
  website?: string;
  latitude: number;
  longitude: number;
  acceptsPrivateInsurance?: boolean;
}
