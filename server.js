const express = require('express')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express();
app.set('port', process.env.PORT || 3001);

const cors = require('cors');

// app.use(cors());
app.use(express.json());


app.get('/', (request, response) => {
  response.json('Server Running!')
});

app.get('/api/v1/projects', (request, response) => {
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





app.listen(app.get('port'), () => {
  console.log(`App is running on http://localhost:${app.get('port')}`)
});
