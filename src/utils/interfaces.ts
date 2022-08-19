import { JWT } from "@fastify/jwt";
import "@fastify/jwt";

declare module "fastify" {
  export interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      id: number;
      email: string;
      username: string;
    };
  }
}

export interface Env {
  PORT: number;
  HOST: string;
  DATABASE_URL: string;
  JWT_SECRET_KEY: string;
}
