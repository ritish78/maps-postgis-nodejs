console.log("Index.ts in db folder is loaded!");
import pkg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "../config";
import { sql } from "drizzle-orm";

const { Pool } = pkg;

const pool: pkg.Pool = new Pool({ connectionString: DATABASE_URL });

pool.on("connect", () => {
  console.log("Connected to Postgres!");
});

pool.on("release", () => {
  console.log("Connection released!");
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Failed to connect to Postgres:", err.message);
    process.exit(1);
  }
  console.log("Postgres pool initialized!");
  release();
});

const db = drizzle(pool, { logger: true });

async function createPostGisExtension() {
  await db.execute(sql`CREATE EXTENSION IF NOT EXISTS postgis`);
}

createPostGisExtension();

export default db;
