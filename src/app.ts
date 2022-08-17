import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import jwt, { JWT } from "@fastify/jwt";
import fastifyEnv from "@fastify/env";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    config: {
      JWT_SECRET_KEY: string;
    };
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

const fastify = Fastify({
  logger: true,
});

/** jwt plugin **/
const envSchema = {
  type: "object",
  required: ["JWT_SECRET_KEY"],
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

fastify.addHook("onRequest", (request, reply, next) => {
  request.jwt = fastify.jwt;
  return next();
});

/** healthckek endpoint **/
fastify.get("/healthcheck", async () => {
  return { message: "api is running" };
});

export default fastify;
