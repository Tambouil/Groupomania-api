import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput } from "./auth.schema";
import { createUser } from "./auth.service";

export async function signup(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (err) {
    return reply.code(400).send(err);
  }
}
