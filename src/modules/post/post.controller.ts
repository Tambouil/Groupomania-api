import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePostInput } from "./post.schema";
import * as postsService from "./post.service";

export const createPost = async (
  request: FastifyRequest<{
    Body: CreatePostInput;
  }>,
  reply: FastifyReply
) => {
  const post = await postsService.createPost(
    request.body,
    request.file,
    request.user.id
  );

  return post;
};

export const getPosts = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const products = await postsService.getPosts();

  return products;
};
