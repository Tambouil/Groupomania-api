import { FastifyInstance } from "fastify";
import { getUsers } from "./user.controller";

const userRoutes = async (fastify: FastifyInstance) => {
  fastify.get(
    "/",
    {
      onRequest: [fastify.authenticate],
    },
    getUsers
  );
};

export default userRoutes;
