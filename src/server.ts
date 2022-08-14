import Fastify from "fastify";
import authRoutes from "./modules/auth/auth.routes";
import { userSchemas } from "./modules/auth/auth.schema";

const fastify = Fastify({
  logger: true,
});

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
