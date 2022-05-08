import { setCookies } from 'cookies-next';
import router from 'next/router';
import { createPatient, createTherapist } from './API';

export function isPasswordNotAcceptable(password: string): boolean {
  // return true if the given password is not acceptable
  return (
    password.match(
      /* Regex Checks for: 
        1. lowercase and uppercase letters
        2. digits
        3. special characters
        4. at least 8 characters long
      */
      /^(?=(.*[a-z])+)(?=(.*[A-Z])+)(?=(.*[0-9])+)(?=(.*[!@#$%^&*()\-__+.])+).{8,}$/gm,
    ) === null
  );
}

export function checkPasswordValidity(
  password: string,
  passwordAgain: string,
  setKeyColor: any,
) {
  if (password !== passwordAgain) {
    setKeyColor('red');
    alert('Passwords do not match! Try again.');
    return 'ERROR';
  }

  if (isPasswordNotAcceptable(password)) {
    setKeyColor('red');
    alert(
      'Password have to be at least 8 characters long and contain at least one number, one uppercase letter, one lowercase letter, and one special character.',
    );
    return 'ERROR';
  }

  return 'SUCCESS';
}

/**
 *
 * This function makes a call to the API based on the callType. Only used inside a registration page
 *
 * @param callType which record to create: user, meaning patient, or therapist
 * @param reqBody the request body to pass into the fetcher
 * @param setAtColor changing the color of the `at icon` in case a 409 error occurs
 */
export function makeRegisterCall(
  callType: 'user' | 'therapist',
  reqBody: any,
  setAtColor: any,
) {
  (callType === 'user' ? createPatient : createTherapist)(reqBody)
    .then((res) => {
      // setting the auth cookie
      /*
        For the substring we take res.id.length + 1 (instead of - 1)
        because the string we are taking it from (JSON.stringify(...))
        has 2 additional chars (quotation marks at the end and beginning)
        Also the reason why we are taking the substring to begin with
      */
      setCookies(
        callType,
        JSON.stringify(res.id).substring(1, res.id.length + 1),
      );
      // succesful registration -> redirect to homepage
      router.push(callType === 'user' ? '/' : '/admin/dashboard');
    })
    .catch((err) => {
      const status = err.statusCode;
      if (status === 409) {
        alert('This email already exists!');
        setAtColor('red');
      }
      if (status === 500) {
        alert('Something went wrong with the server! Sorry about that :(');
      }
    });
}
