import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getPropertyByLocationRadius, getPropertyByUserViewport } from "../../db/preparedStatement.js";
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

  //Getting all properties to display initially on the map is getting slower
  //as we are sending all properties from the database to the map.
  //So, implementing a way to get properties that are on the view port of the user.
  // /api/v1/property/viewport?minLatitude=&maxLatitude=&minLongitude=&maxLongitude=
  // E.g. http://localhost:5000/api/v1/property/viewport?minLatitude=27.702755759687733&maxLatitude=27.726538670810182&minLongitude=85.30446087162532&maxLongitude=85.34059559147397
  fastify.get<{
    Querystring: { minLatitude: string; maxLatitude: string; minLongitude: string; maxLongitude: string };
  }>("/viewport", async (request, reply: FastifyReply) => {
    const { minLatitude, maxLatitude, minLongitude, maxLongitude } = request.query;

    const propertiesFromDatabase = await getPropertyByUserViewport(
      parseFloat(minLatitude),
      parseFloat(maxLatitude),
      parseFloat(minLongitude),
      parseFloat(maxLongitude),
    );

    return reply.send(propertiesFromDatabase);
  });
}
