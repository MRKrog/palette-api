# Palette Picker
This is a REST API with the full CRUD for making projects with a color palette array. Users can access data for specific projects and their associated color palettes.

## Make Requests
- Use GET, POST, PATCH, DELETE requests below to view, add, update, or delete to the API. Endpoint outlined details and how to use are below.

## Projects  

#### GET `/api/v1/projects` (All Projects)
The response sends all the projects in the database. Each project includes the following parameters (id and name):

| Name         | type      | Description                                     |
| :------------|:----------|:------------------------------------------------|
| id           | integer   | unique id for each project                      |
| name         | string    | name of the project                             |

```json
[
  {
      "id": 1,
      "name": "Project One",
      "created_at": "2019-05-09T19:43:08.350Z",
      "updated_at": "2019-05-09T19:43:08.350Z"
  },
  {
      "id": 2,
      "name": "Project Two",
      "created_at": "2019-05-13T19:17:43.823Z",
      "updated_at": "2019-05-13T19:17:43.823Z"
  }

]
```

#### GET `/api/v1/projects/:id` (Request Single Project)
Response will send a single project that matches the id parameter in the request

```json
[
    {
        "id": 18,
        "name": "New home project",
        "created_at": "2019-05-03T17:29:21.759Z",
        "updated_at": "2019-05-03T17:29:21.759Z",
    }
]
```

#### POST `/api/v1/projects` (Create New Project)
A user can create/post a new project to the database. Below is the required parameters and an example post. (Must be formatted to JSON)

| Name         | type      | Description                                     |
| :------------|:----------|:------------------------------------------------|
| name         | string    | name of the project                             |

POST Project Example:
```json
  {
      "name": "My new home color schemes"
  }
```
```
 < new project id >
```

#### DELETE `/api/v1/projects/:id` (Delete a specific project and associated palettes )
A user can also delete a specific project which will also delete all associated palettes. The request parameter id must match a single project which will also delete the palettes which have a projectId that matches.

```
 "Project deleted"
```

#### PATCH `/api/v1/projects/:id` (Update Project Name)
A user can update/patch an existing projects name.  The request parameter id will determine which project will be updated in the database.

```
  "Name Updated Successfully"
```

## Palettes  

#### GET `/api/v1/palettes` (All Palettes)
The response sends all the palettes in the database. Also grab a specific palette by its name by entering a query param ie.
```
http://localhost:3001/api/v1/palettes?name=${name of palette}
```
Spaces are indicated with &rightarrow; %20

Each Palette includes the following parameters (id, name, color_1, color_2, color_3, color_4, and color_5):

| Name         | type      | Description                                     |
| :------------|:----------|:------------------------------------------------|
| id           | integer   | unique id for each concert                      |
| name         | string    | name of palette                                 |
| color_1      | string    | color 1 hex color code                          |
| color_2      | string    | color 2 hex color code                          |
| color_3      | string    | color 3 hex color code                          |
| color_4      | string    | color 4 hex color code                          |
| color_5      | string    | color 5 hex color code                          |

```json
[
  {
      "id": 3,
      "name": "Cool Tones",
      "color_1": "#231F20",
      "color_2": "#000000",
      "color_3": "#FFFFFF",
      "color_4": "#DDDDDD",
      "color_5": "#CCCCCC",
      "project_id": 1,
      "created_at": "2019-05-13T19:16:31.682Z",
      "updated_at": "2019-05-13T19:16:31.682Z"
  },
  {
      "id": 4,
      "name": "Bedroom Colors",
      "color_1": "#FFFFFFF",
      "color_2": "#FFFFFFF",
      "color_3": "#CCCCCC",
      "color_4": "#000000",
      "color_5": "#000000",
      "project_id": 2,
      "created_at": "2019-05-13T19:17:32.000Z",
      "updated_at": "2019-05-13T19:17:32.000Z"
  }
]
```

#### GET `/api/v1/palettes/:id` (Request Specific Palette)
Response will send a specific palette that matches the id parameter in the request

```json
[
  {
    "id": 3,
    "name": "Cool Tones",
    "color_1": "#231F20",
    "color_2": "#000000",
    "color_3": "#FFFFFF",
    "color_4": "#DDDDDD",
    "color_5": "#CCCCCC",
    "project_id": 1,
    "created_at": "2019-05-13T19:16:31.682Z",
    "updated_at": "2019-05-13T19:16:31.682Z"
  }
]
```

#### POST `/api/v1/palettes` (Create A New Palette)
A user can create/post a new palette to the database. This concert must match an associated bands id. This will be the request parameter id in the url provided above. Below is the required parameters and an example post. (Must be formatted to JSON)

| Name         | type      | Description                                     |
| :------------|:----------|:------------------------------------------------|
| id           | integer   | unique id for each concert                      |
| name         | string    | name of palette                                 |
| color_1      | string    | color 1 hex color code                          |
| color_2      | string    | color 2 hex color code                          |
| color_3      | string    | color 3 hex color code                          |
| color_4      | string    | color 4 hex color code                          |
| color_5      | string    | color 5 hex color code                          |

POST Palette Example:
```json
{
    "name": "Creating New Palette",
    "color_1": "#231F20",
    "color_2": "#000000",
    "color_3": "#FFFFFF",
    "color_4": "#DDDDDD",
    "color_5": "#CCCCCC",
    "project_id": 1
}
```

Response from `/api/v1/palettes` example:
```
 < id of created palette >
```

#### DELETE `/api/v1/palettes/:id` (Delete specific Palette)
A user can also delete a specific palette. The request parameter id should match the id of the palette you want to delete.

```
 "Palette Deleted"
```

#### PATCH `/api/v1/palettes/:id` (Update Project Name)
A user can update/patch an existing palettes name.  The request parameter id will determine which palette will be updated in the database.

```
  "Name Updated Successfully"
```

## Contributors
- [Michael Krog](https://github.com/MRKrog)
- [Isaac Sunoo](https://github.com/IsaacSunoo)
