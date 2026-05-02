import dotenv from "dotenv";
dotenv.config();

export const SERVER_PORT = Number(process.env.FASTIFY_SERVER_PORT);
export const DATABASE_URL = process.env.DATABASE_URL;
