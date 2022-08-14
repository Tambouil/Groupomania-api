import { FastifyReply, FastifyRequest } from "fastify";
import { fastify } from "../../server";
import { verifyPassword } from "../../utils/hash";
import { CreateUserInput, LoginInput } from "./auth.schema";
import { createUser, findUserByEmail } from "./auth.service";

export const signup = async (
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) => {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (err) {
    return reply.code(400).send(err);
  }
};

export const login = async (
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply
) => {
  const body = request.body;
  const user = await findUserByEmail(body.email);

  if (!user) {
    return reply.code(401).send({
      message: "Invalid email or password",
    });
  }

  const isValidPassword = await verifyPassword(body.password, user.password);

  if (!isValidPassword) {
    return reply.code(401).send({
      message: "Invalid email or password",
    });
  }

  const { password, ...userWithoutPassword } = user;

  return { accessToken: fastify.jwt.sign(userWithoutPassword) };
};
