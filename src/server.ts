import Fastify from "fastify";
import authRoutes from "./modules/auth/auth.routes";

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
  try {
    fastify.register(authRoutes, { prefix: "/api/auth" });
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
