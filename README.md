# Maps-PostGIS-Nodejs

## Purpose of this project:

1. Utilize PostGIS extension of PostgreSQL to use real world coordinates to map
2. Merge this into GrihaBhoomi Real esate project


[![Map in action](https://github.com/user-attachments/assets/9c1b4e72-7840-4de1-a798-504b3eea763d)](https://github.com/user-attachments/assets/9de3f287-a41d-4234-b1d2-fe13c21f7315)



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
        "id": "07175f5a-f264-4aaf-b2d4-111c7108716b",
        "title": "Cozy House in Durbar Marg",
        "price": 15000000,
        "status": "Sale",
        "property_type": "House",
        "to_rent": false,
        "negotiable": true,
        "image_url": [
            "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1689609950071-af404daa58a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
        ],
        "close_landmark": "Narayanhiti Palace",
        "featured": true,
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
        "id": "0717fc4d-9819-4b74-87b8-cfe7233011ca",
        "title": "Modern Apartment in Thamel",
        "price": 25000,
        "status": "Rent",
        "property_type": "House",
        "to_rent": true,
        "negotiable": false,
        "image_url": [
            "https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        "close_landmark": "Thamel Chowk",
        "featured": false,
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
        "id": "144ca929-4d66-4aeb-8b93-6a9c60966dd2",
        "title": "Commercial Land on New Road",
        "price": 50000000,
        "status": "Sale",
        "property_type": "Land",
        "to_rent": false,
        "negotiable": true,
        "image_url": [
            "https://images.unsplash.com/photo-1683029083464-4b28b07d7f09?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        "close_landmark": "Bishal Bazar",
        "featured": true,
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
        "id": "0b650fa3-0463-4042-96c9-f01015b5efa7",
        "title": "Budget Room near Bhrikuti Mandap",
        "price": 8000,
        "status": "Rent",
        "property_type": "House",
        "to_rent": true,
        "negotiable": false,
        "image_url": [
            "https://images.unsplash.com/photo-1647579350413-a6ada4e480ed?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        "close_landmark": "Bhrikuti Mandap",
        "featured": false,
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
        "id": "1029aaf2-fdb0-4040-9771-a2acbc7c8a2d",
        "title": "Office Space in Baneshwor",
        "price": 45000,
        "status": "Rent",
        "property_type": "House",
        "to_rent": true,
        "negotiable": true,
        "image_url": [
            "https://images.unsplash.com/photo-1720493480479-fa376e364071?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        "close_landmark": "Baneshwor Chowk",
        "featured": false,
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
        "id": "10e5e928-936d-4bfb-9cf8-433a9a5b2b88",
        "title": "Flat for Sale in Pulchowk",
        "price": 12000000,
        "status": "Sale",
        "property_type": "House",
        "to_rent": false,
        "negotiable": false,
        "image_url": [
            "https://plus.unsplash.com/premium_photo-1677620026059-34bd259b0c5f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        "close_landmark": "Pulchowk Campus",
        "featured": false,
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
        "id": "0d150bcc-0e97-49f3-bbba-4fa9ff1cee97",
        "title": "Apartment near Boudhanath Stupa",
        "price": 20000,
        "status": "Rent",
        "property_type": "House",
        "to_rent": true,
        "negotiable": false,
        "image_url": [
            "https://images.unsplash.com/photo-1713789296574-0e56ecd53cbb?q=80&w=1220&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        "close_landmark": "Boudhanath Stupa",
        "featured": false,
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
