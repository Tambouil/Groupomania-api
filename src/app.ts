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

const envOptions = {
  schema: envSchema,
  dotenv: true,
  confKey: "config",
};

const initialize = async () => {
  await fastify.register(fastifyEnv, envOptions);

  await fastify.register(jwt, {
    secret: fastify.config.JWT_SECRET_KEY,
  });
};
initialize();

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

fastify.addHook("onRequest", (request, reply, done) => {
  request.jwt = fastify.jwt;
  return done();
});

/** healthckek endpoint **/
fastify.get("/healthcheck", async () => {
  return { message: "api is running" };
});

export default fastify;
