import { FastifyInstance } from "fastify";
import { signup } from "./auth.controller";

const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/register", signup);
};
export default authRoutes;
