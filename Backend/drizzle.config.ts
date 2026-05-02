import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
// dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("Database URL not provided in the env file! Exiting now!");
}

export default defineConfig({
  schema: "./src/models/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  strict: true,
  verbose: true,
});
