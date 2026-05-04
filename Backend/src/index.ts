import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import { SERVER_PORT } from "../src/config/index.js";
import { propertyRoutes } from "../src/routes/api/property.js";

import db from "../src/db/index.js";

const fastify = Fastify({
  logger: true,
});

fastify.get("/api/v1/ping", (request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ message: "Pong!" });
});

await fastify.register(propertyRoutes, { prefix: "/api/v1/property" });

fastify.listen({ port: SERVER_PORT }, (error: Error | null, address: string) => {
  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }

  console.log("Server is listening on port: ", address);
});
