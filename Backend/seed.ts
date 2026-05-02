import db from "./src/db";
import { address } from "./src/models/address";

const testAddresses = [
  {
    houseNumber: "12",
    street: "Durbar Marg",
    wardNumber: 1,
    municipality: "Kathmandu Metropolitan City",
    city: "Kathmandu",
    district: "Kathmandu",
    province: "Bagmati",
    latitude: 27.7105,
    longitude: 85.3157,
  },
  {
    houseNumber: "45",
    street: "Thamel Marg",
    wardNumber: 16,
    municipality: "Kathmandu Metropolitan City",
    city: "Kathmandu",
    district: "Kathmandu",
    province: "Bagmati",
    latitude: 27.7154,
    longitude: 85.3123,
  },
  {
    houseNumber: "8",
    street: "Lakeside Road",
    wardNumber: 6,
    municipality: "Pokhara Metropolitan City",
    city: "Pokhara",
    district: "Kaski",
    province: "Gandaki",
    latitude: 28.2096,
    longitude: 83.9556,
  },
  {
    houseNumber: "23",
    street: "Mahendra Path",
    wardNumber: 3,
    municipality: "Pokhara Metropolitan City",
    city: "Pokhara",
    district: "Kaski",
    province: "Gandaki",
    latitude: 28.238,
    longitude: 83.9956,
  },
  {
    houseNumber: "5",
    street: "Bhrikuti Mandap",
    wardNumber: 10,
    municipality: "Kathmandu Metropolitan City",
    city: "Kathmandu",
    district: "Kathmandu",
    province: "Bagmati",
    latitude: 27.6933,
    longitude: 85.3164,
  },
];

async function seed() {
  console.log("Seeding addresses!");
  await db.insert(address).values(testAddresses);
  console.log("Done!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
