import { findUsers } from "./user.service";

export const getUsers = async () => {
  const users = await findUsers();
  return users;
};
