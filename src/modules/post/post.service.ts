import { FilesObject } from "fastify-multer/lib/interfaces";
import prisma from "../../utils/prisma";
import { CreatePostInput } from "./post.schema";

export const createPost = async (
  data: CreatePostInput,
  file: FilesObject,
  authorId: number
) => {
  const { content } = data;
  return prisma.post.create({
    data: {
      content,
      authorId,
      ...(file && { media: `images/posts/${file.filename}` }),
    },
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
