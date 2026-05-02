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

# Using Nominatim:

```
GET http://localhost:8080/search?q=koteshwor&format=json
GET http://localhost:8080/search?q=Thamel+Kathmandu&format=json
```
