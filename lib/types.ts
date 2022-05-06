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
  address: string;
  institutionName?: string;
  languages: string[];
  specialties: string[];
  canWriteMedication: boolean;
  website?: string;
  location?: string;
  acceptsPrivateInsurance?: boolean;
}

export interface ITherapistCreate {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  bio: string;
  address: string;
  institutionName?: string;
  languages: string[];
  specialties: string[];
  canWriteMedication: boolean;
  website?: string;
  location?: string;
  acceptsPrivateInsurance?: boolean;
}
