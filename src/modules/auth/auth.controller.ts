import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput } from "./auth.schema";
import { createUser } from "./auth.service";

export const signup = async (
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) => {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    return reply.code(500).send(err);
  }
};
