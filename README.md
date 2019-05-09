# Palette Picker
This is a REST API containing over 50 Bands that will be playing concerts at Red Rocks in 2019. Users can access data for specific dates or bands that will be performing. Additionally a user can post and delete bands and concerts.

## Make Requests
- Use GET, POST, DELETE requests below to view, add, or delete to the API. Endpoint outlined details and how to use are below.

## Getting Started:
The base url to make requests to the api:
#### `https://mkbyob.herokuapp.com/`

## Bands  

#### GET `/api/v1/bands` (All Bands)
The response sends all the bands in the database. Each Band includes the following parameters (id, name, and genre):

| Name         | type      | Description                                     |
| :------------|:----------|:------------------------------------------------|
| id           | integer   | unique id for each band                         |
| name         | string    | name of the band                                |
| genre        | string    | genre / type of music for that band             |

Response from `https://mkbyob.herokuapp.com/api/v1/bands` example:
```json
[
    {
        "id": 25,
        "name": "The 1975",
        "created_at": "2019-05-03T17:29:21.750Z",
        "updated_at": "2019-05-03T17:29:21.750Z",
        "genre": "Rock"
    },
    {
        "id": 26,
        "name": "Twiddle / Pigeon Playing Ping Pong",
        "created_at": "2019-05-03T17:29:21.757Z",
        "updated_at": "2019-05-03T17:29:21.757Z",
        "genre": "Rock"
    },
]
```

#### GET `/api/v1/bands/:id` (Request Single Band)
Response will send a single band that matches the id parameter in the request

Response from `https://mkbyob.herokuapp.com/api/v1/bands/27` example:
```json
[
    {
        "id": 27,
        "name": "Shpongle Live In Concert",
        "created_at": "2019-05-03T17:29:21.759Z",
        "updated_at": "2019-05-03T17:29:21.759Z",
        "genre": "Psychedelic"
    }
]
```

#### POST `/api/v1/bands` (Create New Band)
A user can create/post a new band to the database. Below is the required parameters and an example post. (Must be formatted to JSON)

| Name         | type      | Description                                     |
| :------------|:----------|:------------------------------------------------|
| name         | string    | name of the band                                |
| genre        | string    | genre / type of music for that band             |

POST Band Example:
```json
  {
      "name": "Name of Band",
      "genre": "Genre of Band",
  }
```

Response from `https://mkbyob.herokuapp.com/api/v1/bands` example:
```
 "Successfully Posted Band"
```

#### DELETE `/api/v1/bands/:id/concerts` (Delete a specific band and associated concerts )
A user can also delete a specific band which will also delete all associated concerts. The request parameter id must match a single band which will also delete the concerts which have a concertId that matches.

Response from `https://mkbyob.herokuapp.com/api/v1/bands/:id/concerts` example:
```
 "Band and Concerts Deleted"
```

## Concerts  

#### GET `/api/v1/concerts` (All Concerts)
The response sends all the concerts in the database. Each Concert includes the following parameters (id, date, time_start, time_doors, tickets_link, and concertId):

| Name         | type      | Description                                     |
| :------------|:----------|:------------------------------------------------|
| id           | integer   | unique id for each concert                      |
| date         | string    | date of concert                                 |
| time_start   | string    | concert start time                              |
| time_doors   | string    | concert doors open time                         |
| tickets_link | string    | link to purchase concert tickets                |
| concertId    | integer   | unique id for each concert to the band playing  |

Response from `https://mkbyob.herokuapp.com/api/v1/concerts` example:
```json
[
    {
        "id": 25,
        "date": "TUESDAY April 30, 2019",
        "time_start": "7:00 PM",
        "time_doors": "6:00 PM",
        "tickets_link": "www.axs.com/events/363535/the-1975",
        "created_at": "2019-05-03T17:29:21.843Z",
        "updated_at": "2019-05-03T17:29:21.843Z",
        "concertId": 25
    },
    {
        "id": 26,
        "date": "SUNDAY May 05, 2019",
        "time_start": "4:00 PM",
        "time_doors": "4:00 PM",
        "tickets_link": "/ww.axs.com/events/363968/nght",
        "created_at": "2019-05-03T17:29:21.843Z",
        "updated_at": "2019-05-03T17:29:21.843Z",
        "concertId": 29
    },
]
```

#### GET `/api/v1/bands/:id/concerts` (Specific Concerts where a Band is playing)
Response will send all the concerts for a specific band that matches the id parameter in the request

Response from `https://mkbyob.herokuapp.com/api/v1/bands/27/concerts` example:
```json
[
    {
        "id": 39,
        "date": "FRIDAY May 03, 2019",
        "time_start": "7:00 PM",
        "time_doors": "6:30 PM",
        "tickets_link": "www.axs.com/events/361628/shpongle-live-in-concert-tickets?skin=redrocks",
        "created_at": "2019-05-03T17:29:21.851Z",
        "updated_at": "2019-05-03T17:29:21.851Z",
        "concertId": 27
    },
    {
        "id": 40,
        "date": "SATURDAY May 04, 2019",
        "time_start": "7:00 PM",
        "time_doors": "7:00 PM",
        "tickets_link": "www.axs.com/events/361629/shpongle-live-in-concert-tickets?skin=redrocks",
        "created_at": "2019-05-03T17:29:21.851Z",
        "updated_at": "2019-05-03T17:29:21.851Z",
        "concertId": 27
    }
]
```

#### POST `/api/v1/bands/:id/concerts` (Create A New Concerts that is associated to a Band)
A user can create/post a new concert to the database. This concert must match an associated bands id. This will be the request parameter id in the url provided above. Below is the required parameters and an example post. (Must be formatted to JSON)

| Name         | type      | Description                                     |
| :------------|:----------|:------------------------------------------------|
| date         | string    | date of concert                                 |
| time_start   | string    | concert start time                              |
| time_doors   | string    | concert doors open time                         |
| tickets_link | string    | link to purchase concert tickets                |

POST Concerts Example:
```json
{
  "concerts": [
    {
      "date": "MONDAY June 10, 2019",
      "time_start": "7:00 PM",
      "time_doors": "6:00 PM",
      "tickets_link": "LinkToPurchaseTickets"
    },
    {
      "date": "TUESDAY June 11, 2019",
      "time_start": "7:00 PM",
      "time_doors": "6:00 PM",
      "tickets_link": "LinkToPurchaseTickets"
    }
  ]
}
```

Response from `/api/v1/bands/27/concerts` example:
```
 "Successfully Posted Concerts"
```

#### DELETE `/api/v1/bands/:id/concerts` (Delete specific concerts )
A user can also delete a specific concert. The request parameter id should match the id of the concert you want to delete.

Response from `https://mkbyob.herokuapp.com/api/v1/concerts/:id` example:
```
 "Concert Deleted"
```

## Contributors
- [Michael Krog](https://github.com/MRKrog)
