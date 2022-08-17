import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import authRoutes from "./modules/auth/auth.routes";
import { userSchemas } from "./modules/auth/auth.schema";
import jwt, { JWT } from "@fastify/jwt";
import fastifyEnv from "@fastify/env";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  interface FastifyInstance {
    config: {
      JWT_SECRET: string;
    };
  }
}

const fastify = Fastify({
  logger: true,
});

/** jwt plugin **/
const envSchema = {
  type: "object",
  required: ["JWT_SECRET"],
  properties: {
    JWT_SECRET_KEY: {
      type: "string",
      default: "mysecretpassword",
    },
  },
};

fastify.register(fastifyEnv, {
  schema: envSchema,
  dotenv: true,
  confKey: "config",
});

fastify.register(jwt, {
  secret: fastify.config.JWT_SECRET,
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

fastify.addHook("onRequest", (request, reply, next) => {
  request.jwt = fastify.jwt;
  return next();
});

/** healthckek endpoint **/
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
