import bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};
