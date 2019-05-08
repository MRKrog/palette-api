const express = require('express')
const cors = require('cors');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express();
app.use(cors());
app.use(express.json());

// 4 GET endpoints
  // 2 GET endpoints that serve up ALL of a single resource
  // 2 GET endpoints that serve up a single record of a resource
// 2 POST endpoints
// 2 PUT/PATCH endpoints
// 2 DELETE endpoints


app.get('/', (request, response) => {
  response.json('Server Running!')
});


// Grab All Projects and Associated Palettes
// Needs Work To Finish
app.get('/api/v1/project/:id/palettes', (request, response) => {
  database('projects').select()
    .then(projects => {
      database('palettes').where('project_id', projects.id).select()
        .then(palette => {
          response.status(200).json(palette)
        })
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

// Grab Single Project
app.get('/api/v1/projects/:id', (request, response) => {
  database('projects').select()
    .then((projects) => {
      if(projects.length) {
        response.status(200).json(projects);
      } else {
        response.status(404).json({
          error: `Could not find projects`
        });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});


module.exports = app;
