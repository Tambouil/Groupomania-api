import { FastifyInstance } from "fastify";
import { signup } from "./auth.controller";
import { $ref } from "./auth.schema";

const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    "/register",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
      },
    },
    signup
  );
};
export default authRoutes;
