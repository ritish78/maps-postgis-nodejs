import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getPropertyByLocationRadius } from "../../db/preparedStatement.js";
import { getAllPropertiesOnMap } from "src/controller/property.js";
// import { getPropertyByLocationRadiusPrepared } from "src/db/preparedStatement";

/**
 * https://weiyilee17.github.io/learning-notes/docs/fastify/routes
 * @param fastify
 */
export async function propertyRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    const allProperties = await getAllPropertiesOnMap();

    return reply.send(allProperties);
  });

  //  /api/v1/property/nearby?latitude=27.7105&longitude=85.3157&radius=5
  fastify.get<{ Querystring: { latitude: string; longitude: string; radius?: string } }>(
    "/nearby",
    async (request, reply: FastifyReply) => {
      //async (request: FastifyReqyest, reply: FastifyReply) => {
      //In above line, when we specify FastifyRequest, TS throws error in the below line:
      //'latitude' is declared but its value is never read.ts(6133) Property 'latitude' does not exist on type 'unknown'.
      //By removing it, we are letting Fastify infer the type automatically which keeps the full info intact
      const { latitude, longitude, radius = "5" } = request.query;

      const radiusInMeters = parseFloat(radius) * 1000;

      const propertiesFromDatabase = await getPropertyByLocationRadius(
        parseFloat(latitude),
        parseFloat(longitude),
        radiusInMeters,
      );

      return reply.send(propertiesFromDatabase);
    },
  );
}
