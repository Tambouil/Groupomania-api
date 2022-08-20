import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import jwt from "@fastify/jwt";
import { config } from "./utils/config";
import fastifyStatic from "@fastify/static";
import path from "path";
import multer from "fastify-multer";

const fastify = Fastify({
  logger: true,
});

/** static folder plugin **/
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "../public"),
  prefix: "/public/",
});

/** multer plugin **/
fastify.register(multer.contentParser);

/** jwt plugin **/
fastify.register(jwt, {
  secret: config.JWT_SECRET_KEY,
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

fastify.addHook("onRequest", (request, reply, done) => {
  request.jwt = fastify.jwt;
  return done();
});

/** healthckek endpoint **/
fastify.get("/healthcheck", async () => {
  return { message: "api is running" };
});

export default fastify;
