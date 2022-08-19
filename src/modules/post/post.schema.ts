import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const postInput = {
  content: z.string().trim().max(255),
  media: z.string().optional(),
};
const postGenerated = {
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
};

const createPostSchema = z.object({
  ...postInput,
});
const postResponseSchema = z.object({
  ...postInput,
  ...postGenerated,
});

const postsResponseSchema = z.array(postResponseSchema); // single post response endpoint

export type CreatePostInput = z.infer<typeof createPostSchema>;

export const { schemas: postSchemas, $ref } = buildJsonSchemas(
  {
    createPostSchema,
    postResponseSchema,
    postsResponseSchema,
  },
  { $id: "Post" }
);
