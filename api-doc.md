# SPORTSKUY API Documentation

## Models :

_User_

```
- username : string, required
- email : string, required, unique
- password : string, required
```

_Event_

```
- name : string, required
- category : string, required
- address : string, required
- imageUrl : string, required
- lattitude : string, required
- longitude : string, required
- date : date, required
- time : string, required
```

_Player_

```
- UserId : integer, required
- EventId : integer, required
```

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-signin`
- `GET /events`

Routes below need authentication:

- `POST /events`
- `GET /events/players`
- `POST /events/:eventId`
- `GET /events/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "username": "string"

}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "username": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST /google-signin

Request:

- body:

```json
{
  "id_token": "string",
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
{
  "access_token": "string"
}
```

_Response (Global error)_


&nbsp;

## 4. GET /events

Description:
- Get all events from database

_Response (200 - OK)_

```json
[
  {
       "id": 15,
        "name": "futsal",
        "category": "Futsal",
        "address": "RW 11, Bintaro, Pesanggrahan, South Jakarta, Jakarta Special Capital Region, 15412, Indonesia",
        "imageUrl": "https://ik.imagekit.io/nzzuhdi/naruto_kQqJRSTSz.jpeg",
        "lattitude": "-6.273000575538261",
        "longitude": "106.76138639431886",
        "date": "2021-12-01T00:00:00.000Z",
        "time": "13:50:00"
    },
  {
    "id": 14,
        "name": "sepakbola",
        "category": "Futsal",
        "address": "RW 11, Bintaro, Pesanggrahan, South Jakarta, Jakarta Special Capital Region, 15412, Indonesia",
        "imageUrl": "https://ik.imagekit.io/nzzuhdi/naruto_zUNMQ08Kv.jpeg",
        "lattitude": "-6.273630378947385",
        "longitude": "106.75905287247588",
        "date": "2021-11-23T00:00:00.000Z",
        "time": "11:43:00"
  },
  ...
]
```

&nbsp;

## 5. POST /events

Description:
- Add new events to database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name":"string", 
  "category":"string",
   "address":"string", 
   "imageUrl":"string", 
   "lattitude":"string", 
   "longitude":"string", 
   "date":"date", 
   "time":"time" 
}
```

_Response (201 - Created)_

```json
{
  "id": 15,
        "name": "futsal",
        "category": "Futsal",
        "address": "RW 11, Bintaro, Pesanggrahan, South Jakarta, Jakarta Special Capital Region, 15412, Indonesia",
        "imageUrl": "https://ik.imagekit.io/nzzuhdi/naruto_kQqJRSTSz.jpeg",
        "lattitude": "-6.273000575538261",
        "longitude": "106.76138639431886",
        "date": "2021-12-01T00:00:00.000Z",
        "time": "13:50:00"
}
```

_Response (500 - Internal Server Error)_


&nbsp;

## 6. GET /events/players

Description:
- Get all players from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
        "id": 33,
        "UserId": 4,
        "EventId": 5
    },
    {
        "id": 32,
        "UserId": 5,
        "EventId": 5
    },
  ...
]
```

&nbsp;

## 7. POST /events/players/:eventid

Description:
- Add players to events

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "eventId": "integer (required)"
}
```

_Response (201 - Created)_

```json
{
  "result": {
      "id":15,
      "UserId": 1,
      "EventId": 2
  },

  "message": "Success Join ${eventDetail.name} & Check your email for the reminder"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You already joined"
}
```

&nbsp;
## 7. GET /events/:id

Description:
- Show event details by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
   "id": 1,
    "name": "futsal test",
    "category": "futsal",
    "address": "jl. tebet",
    "imageUrl": "https://ik.imagekit.io/nzzuhdi/HACKTIVNEWS_N_kaUtZCMDs.png",
    "lattitude": "-6.218702233493541",
    "longitude": "106.80351239999997",
    "date": "2021-11-19T00:00:00.000Z",
    "time": "07:30:00",
    "Players": [
        {
            "id": 1,
            "User": {
                "username": "jagoan"
            }
        },
        {
            "id": 2,
            "User": {
                "username": "jagoan"
            }
        },
        {
            "id": 3,
            "User": {
                "username": "jagoan"
            }
        },
        {
            "id": 4,
            "User": {
                "username": "jagoan2"
            }
        },
        {
            "id": 7,
            "User": {
                "username": "nawfalzuhdi@gmail.com"
            }
        }
    ]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Event not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Must login first with correct account"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You have no access"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```