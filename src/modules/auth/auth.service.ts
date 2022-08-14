import { CreateUserInput } from "./auth.schema";
import prisma from "../../utils/prisma";
import { hashPassword } from "../../utils/hash";

export const createUser = async (input: CreateUserInput) => {
  const { email, password, username } = input;

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
    },
  });

  return user;
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};
