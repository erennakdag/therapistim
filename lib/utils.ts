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
