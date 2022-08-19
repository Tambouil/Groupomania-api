import prisma from "../../utils/prisma";

export const findUsers = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      profilePic: true,
      role: true,
    },
  });
};
