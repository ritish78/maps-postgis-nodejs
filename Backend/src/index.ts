import dotenv from "dotenv";
import Fastify, { FastifyRequest, FastifyReply } from "fastify";

dotenv.config();

const SERVER_PORT = Number(process.env.FASTIFY_SERVER_PORT);

const fastify = Fastify({
  logger: true,
});

fastify.get("/api/v1/ping", (request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ message: "Pong!" });
});

fastify.listen({ port: SERVER_PORT }, (error: Error | null, address: string) => {
  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }

  console.log("Server is listening on port: ", address);
});
