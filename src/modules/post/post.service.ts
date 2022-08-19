import prisma from "../../utils/prisma";
import { CreatePostInput } from "./post.schema";

export const createPost = async (
  data: CreatePostInput & { authorId: number }
) => {
  return prisma.post.create({
    data,
  });
};

export const getPosts = () => {
  return prisma.post.findMany({
    select: {
      id: true,
      content: true,
      media: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
};
