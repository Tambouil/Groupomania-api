import { FastifyInstance } from "fastify";
import { createPost, getPosts } from "./post.controller";
import { $ref, CreatePostInput } from "./post.schema";

const postRoutes = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: CreatePostInput }>(
    "/",
    {
      onRequest: [fastify.authenticate],
      schema: {
        body: $ref("createPostSchema"),
        response: {
          201: $ref("postResponseSchema"),
        },
      },
    },
    createPost
  );

  fastify.get(
    "/",
    {
      onRequest: [fastify.authenticate],
      schema: {
        response: {
          200: $ref("postsResponseSchema"),
        },
      },
    },

    getPosts
  );
};

export default postRoutes;
