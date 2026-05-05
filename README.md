# Maps-PostGIS-Nodejs

## Purpose of this project:

1. Utilize PostGIS extension of PostgreSQL to use real world coordinates to map
2. Merge this into GrihaBhoomi Real esate project

# How to use this:

1. use docker compose to start the services. `PostGIS` service also runs using it.

```
docker compose up
```

2. cd into backend

```
cd backend
```

3. Then, we need to generate the migration and run the migration

```
npm run migrate:generate
npm run migrate:run
```

4. We need to setup a sync trigger.
   a. First use this command to run command on docker container:
   ```
   docker exec -it usersdatapostgres psql - U rajeshhamal -d mapsdatabase
   ```
   b. Then, run this command to create sync trigger:

```
CREATE OR REPLACE FUNCTION sync_location()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.latitude IS NOT NULL AND NEW.longitude IS NOT NULL THEN
    NEW.location = ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
  ELSE
    NEW.location = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_location
BEFORE INSERT OR UPDATE ON address
FOR EACH ROW EXECUTE FUNCTION sync_location();
```

5. Now, we can seed info to the database.

```
npm run seed
```

After seeding the database:
<img width="1830" height="627" alt="After seeding the database with address" src="https://github.com/user-attachments/assets/ededbdaf-435f-4666-9cab-c858daba37c0" />

6. We can see property inside a certain radius:

```
GET localhost:5000/api/v1/property/nearby?latitude=27.7105&longitude=85.3157&radius=5

Response:
[
    {
        "id": "22089603-4b41-4b17-9b53-7c6dc11552aa",
        "house_number": "12",
        "street": "Durbar Marg",
        "ward_number": 1,
        "municipality": "Kathmandu Metropolitan City",
        "city": "Kathmandu",
        "district": "Kathmandu",
        "province": "Bagmati",
        "latitude": 27.7105,
        "longitude": 85.3157,
        "distance_km": "0.00"
    },
    {
        "id": "08df6b47-cf13-424e-8e90-3c19b53c3c27",
        "house_number": "45",
        "street": "Thamel Marg",
        "ward_number": 16,
        "municipality": "Kathmandu Metropolitan City",
        "city": "Kathmandu",
        "district": "Kathmandu",
        "province": "Bagmati",
        "latitude": 27.7154,
        "longitude": 85.3123,
        "distance_km": "0.64"
    },
    {
        "id": "88928dea-cc68-4c7d-b621-188e2ce801a6",
        "house_number": "101",
        "street": "New Road",
        "ward_number": 23,
        "municipality": "Kathmandu Metropolitan City",
        "city": "Kathmandu",
        "district": "Kathmandu",
        "province": "Bagmati",
        "latitude": 27.7041,
        "longitude": 85.3131,
        "distance_km": "0.75"
    },
    {
        "id": "abed05cd-7dbb-4ed6-a114-0979818b5950",
        "house_number": "5",
        "street": "Bhrikuti Mandap",
        "ward_number": 10,
        "municipality": "Kathmandu Metropolitan City",
        "city": "Kathmandu",
        "district": "Kathmandu",
        "province": "Bagmati",
        "latitude": 27.6933,
        "longitude": 85.3164,
        "distance_km": "1.91"
    },
    {
        "id": "4252b11b-a192-40f3-b875-57bc760969cd",
        "house_number": "19",
        "street": "Baneshwor Marg",
        "ward_number": 11,
        "municipality": "Kathmandu Metropolitan City",
        "city": "Kathmandu",
        "district": "Kathmandu",
        "province": "Bagmati",
        "latitude": 27.6921,
        "longitude": 85.3352,
        "distance_km": "2.80"
    },
    {
        "id": "a9bf42b6-ae24-4b82-9803-1ea5bf3ae992",
        "house_number": "55",
        "street": "Pulchowk Road",
        "ward_number": 2,
        "municipality": "Lalitpur Metropolitan City",
        "city": "Lalitpur",
        "district": "Lalitpur",
        "province": "Bagmati",
        "latitude": 27.6762,
        "longitude": 85.3176,
        "distance_km": "3.81"
    },
    {
        "id": "e5a96186-6701-4b73-8359-5b5a59075b94",
        "house_number": "3",
        "street": "Boudha Road",
        "ward_number": 7,
        "municipality": "Kathmandu Metropolitan City",
        "city": "Kathmandu",
        "district": "Kathmandu",
        "province": "Bagmati",
        "latitude": 27.7215,
        "longitude": 85.3621,
        "distance_km": "4.74"
    }
]
```

# Using Nominatim:

```
GET http://localhost:8080/search?q=koteshwor&format=json
GET http://localhost:8080/search?q=Thamel+Kathmandu&format=json
```
