import Fastify from "fastify";

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
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
