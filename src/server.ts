import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import authRoutes from "./modules/auth/auth.routes";
import { userSchemas } from "./modules/auth/auth.schema";
import jwt from "@fastify/jwt";

export const fastify = Fastify({
  logger: true,
});

fastify.register(jwt, {
  secret: "mysecretpassword",
});
fastify.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      return reply.code(401).send(error);
    }
  }
);

fastify.get("/healthcheck", async () => {
  return { message: "api is running" };
});

/**
 * Run the server!
 */
const start = async () => {
  for (const schema of [...userSchemas]) {
    fastify.addSchema(schema);
  }

  fastify.register(authRoutes, { prefix: "/api/auth" });
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
