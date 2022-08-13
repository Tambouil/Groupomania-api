import { CreateUserInput } from "./auth.schema";
import prisma from "../../utils/prisma";

export const createUser = async (input: CreateUserInput) => {
  const { email, password, username } = input;

  const user = await prisma.user.create({
    data: {
      email,
      password,
      username,
    },
  });

  return user;
};
