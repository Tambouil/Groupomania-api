import { FastifyInstance } from "fastify";
import { login, signup } from "./auth.controller";
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

  fastify.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    login
  );
};
export default authRoutes;
