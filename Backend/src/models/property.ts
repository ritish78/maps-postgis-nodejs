import { InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  pgEnum,
  index,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { address } from "../models/address.js";

export const PropertyType = pgEnum("property_type", ["House", "Land"]);
export const PropertyStatus = pgEnum("property_status", ["Sale", "Rent", "Hold", "Sold"]);

export const property = pgTable(
  "property",
  {
    id: uuid("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    description: text("description").notNull(),
    toRent: boolean("to_rent").notNull(),
    address: uuid("address").references(() => address.id),
    closeLandmark: varchar("close_landmark", { length: 255 }),
    propertyType: PropertyType("property_type").default("House").notNull(),
    availableFrom: timestamp("available_from", { mode: "string" }).notNull(),
    availableTill: timestamp("available_till", { mode: "string" }),
    price: integer("price").notNull(),
    negotiable: boolean("negotiable").default(false).notNull(),
    imageUrl: text("image_url").array(),
    status: PropertyStatus("status").default("Sale").notNull(),
    listedAt: timestamp("listed_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    featured: boolean("featured").default(false),
    private: boolean("private").default(false),
    expiresOn: timestamp("expires_on", { mode: "string" }).notNull(),
    views: integer("views").default(1).notNull(),
  },
  (table) => [
    index("address_index").on(table.address),
    index("price_index").on(table.price),
    index("property_type_index").on(table.price),
  ],
);

export type Property = InferSelectModel<typeof property>;
