import db from "../db/index.js";
import { eq, isNotNull, sql } from "drizzle-orm";
import { address } from "src/models/address.js";
import { property } from "src/models/property.js";

// export const getPropertyByLocationRadiusPrepared = db
//   .execute(
//     sql`
//         SELECT id, house_number, street, ward_number, municipality, city, district, province, latitude, longitude, ROUND(
//       (ST_Distance(
//         location::geography,
//         ST_SetSRID(ST_MakePoint(${sql.placeholder("longitude")}, ${sql.placeholder("latitude")}), 4326)::geography
//       ) / 1000)::numeric,
//       2
//     ) AS distance_km
//   FROM address
//   WHERE
//     location IS NOT NULL
//     AND ST_DWithin(
//       location::geography,
//       ST_SetSRID(ST_MakePoint(${sql.placeholder("longitude")}, ${sql.placeholder("latitude")}), 4326)::geography,
//       ${sql.placeholder("radiusInMeters")}
//     )
//   ORDER BY distance_km AS
//     `,
//   );

// export async function getPropertyByLocationRadius(
//   latitude: number,
//   longitude: number,
//   radiusInMeters: number,
// ) {
//   const propertiesFromDatabase = await db.execute(sql`
//     SELECT
//       id,
//       house_number,
//       street,
//       ward_number,
//       municipality,
//       city,
//       district,
//       province,
//       latitude,
//       longitude,
//       ROUND(
//         (ST_Distance(
//           location::geography,
//           ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography
//         ) / 1000)::numeric,
//         2
//       ) AS distance_km
//     FROM address
//     WHERE
//       location IS NOT NULL
//       AND ST_DWithin(
//         location::geography,
//         ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography,
//         ${radiusInMeters}
//       )
//     ORDER BY distance_km ASC
//   `);

//   return propertiesFromDatabase.rows;
// }

// export const getAllPropertiesOnMapPrepared = db
//   .select({
//     id: address.id,
//     houseNumber: address.houseNumber,
//     street: address.street,
//     wardNumber: address.wardNumber,
//     municipality: address.municipality,
//     city: address.city,
//     district: address.district,
//     province: address.province,
//     latitude: address.latitude,
//     longitude: address.longitude,
//   })
//   .from(address)
//   .where(isNotNull(address.location))
//   .prepare("get-all-properties-on-map");

export const getAllPropertiesOnMapPrepared = db
  .select({
    id: property.id,
    title: property.title,
    price: property.price,
    status: property.status,
    property_type: property.propertyType,
    to_rent: property.toRent,
    negotiable: property.negotiable,
    close_landmark: property.closeLandmark,
    image_url: property.imageUrl,
    featured: property.featured,
    house_number: address.houseNumber,
    street: address.street,
    ward_number: address.wardNumber,
    municipality: address.municipality,
    city: address.city,
    district: address.district,
    province: address.province,
    latitude: address.latitude,
    longitude: address.longitude,
  })
  .from(property)
  .leftJoin(address, eq(property.address, address.id))
  .where(isNotNull(address.location))
  .prepare("get-all-properties-on-map");

export async function getPropertyByLocationRadius(
  latitude: number,
  longitude: number,
  radiusInMeters: number,
) {
  const result = await db.execute(sql`
    SELECT
      p.id,
      p.title,
      p.price,
      p.status,
      p.property_type,
      p.to_rent,
      p.negotiable,
      p.image_url,
      p.close_landmark,
      p.image_url,
      p.featured,
      a.house_number,
      a.street,
      a.ward_number,
      a.municipality,
      a.city,
      a.district,
      a.province,
      a.latitude,
      a.longitude,
      ROUND(
        (ST_Distance(
          a.location::geography,
          ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography
        ) / 1000)::numeric,
        2
      ) AS distance_km
    FROM property p
    LEFT JOIN address a ON p.address = a.id
    WHERE
      a.location IS NOT NULL
      AND ST_DWithin(
        a.location::geography,
        ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography,
        ${radiusInMeters}
      )
    ORDER BY distance_km ASC
  `);

  return result.rows;
}
