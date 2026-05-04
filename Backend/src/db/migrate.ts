import { migrate } from "drizzle-orm/node-postgres/migrator";
import db from "../db/index.js";

(async function migrateSchema() {
  try {
    console.log("Migration Started!");
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migration Finished!");
  } catch (error) {
    console.error("Error occurred during migration", error);
    process.exit(1);
  }
})();
