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

# Using Nominatim:

```
GET http://localhost:8080/search?q=koteshwor&format=json
GET http://localhost:8080/search?q=Thamel+Kathmandu&format=json
```
