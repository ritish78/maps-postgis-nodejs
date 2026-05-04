import db from "../db/index.js";
import { sql } from "drizzle-orm";

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

export async function getPropertyByLocationRadius(
  latitude: number,
  longitude: number,
  radiusInMeters: number,
) {
  const propertiesFromDatabase = await db.execute(sql`
    SELECT 
      id, 
      house_number, 
      street, 
      ward_number, 
      municipality, 
      city, 
      district, 
      province, 
      latitude, 
      longitude,
      ROUND(
        (ST_Distance(
          location::geography,
          ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography
        ) / 1000)::numeric,
        2
      ) AS distance_km
    FROM address
    WHERE
      location IS NOT NULL
      AND ST_DWithin(
        location::geography,
        ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography,
        ${radiusInMeters}
      )
    ORDER BY distance_km ASC
  `);

  return propertiesFromDatabase.rows;
}
