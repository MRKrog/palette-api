const express = require('express')
const cors = require('cors');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express();
app.use(cors());
app.use(express.json());

const paletteParameters = ['name', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5', 'project_id'];

app.get('/', (req, res) => {
  res.json('Server Running!')
});

// Get All Projects
app.get('/api/v1/projects', async (req, res) => {
  try {
    const projects = await database('projects').select();
    console.log('projects', projects);
    res.status(200).json(projects);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Grab All Projects and Associated Palettes
// Needs Work To Finish
app.get('/api/v1/projects/:id/palettes', async (req, res) => {
  try {
    const { id: project_id } = req.params;
    const palettes = await database('palettes')
      .column(['id', ...paletteParams])
      .where({ project_id });
    if (!palettes.length) return res.sendStatus(404);
    res.status(200).json(palettes);
  } catch {
    res.sendStatus(500);
  }
});

// Grab Single Project
app.get('/api/v1/projects/:id', async (req, res) => {
 const id = parseInt(req.params.id);
 database('projects')
   .where('id', id)
   .then(projects => {
     if (projects.length) {
       return res.status(200).json(projects[0]);
     } else {
       return res.sendStatus(404);
     }
   })
   .catch(error => res.status(500).json({ error }));
});

// Grab Single Palette
app.get('/api/v1/palettes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  database('palettes')
    .where('id', id)
    .then(palettes => {
      if (palettes.length) {
        return res.status(200).json(palettes[0]);
      } else {
        return res.sendStatus(404);
      }
    })
    .catch(error => res.status(500).json({ error }));
});

// Create a new project
app.post('/api/v1/projects', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(422).json('Please enter project name.');
    const [id] = await database('projects').insert({ name }, 'id');
    res.status(201).json({ id });
  } catch {
    res.sendStatus(500);
  }
});

// Create a new palette
app.post('/api/v1/palettes', async (req, res) => {
  try {
    const palette = req.body;
    for (let param of paletteParameters) {
      if (!palette[param]) {
        const message =
          'Request body must include ' +
          'name: <String>, ' +
          'color1: <String>, ' +
          'color2: <String>, ' +
          'color3: <String>, ' +
          'color4: <String>, ' +
          'color5: <String>, ' +
          'and project_id: <Number>. ' +
          `Please provide ${param}.`;
        return res.status(422).json(message);
      }
    }
    const [id] = await database('palettes').insert(palette, 'id');
    res.status(201).json({ id });
  } catch {
    res.sendStatus(500);
  }
});

// Delete Project
app.delete('/api/v1/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const matchingProjects = await database('projects').where({ id });
    if (!matchingProjects.length) return res.sendStatus(404);
    await database('palettes')
      .where({ project_id: id })
      .del();
    await database('projects')
      .where({ id })
      .del();
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

// Delete Palette
app.delete('/api/v1/palettes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const matchingPalettes = await database('palettes').where({ id });
    if (!matchingPalettes.length) return res.sendStatus(404);
    await database('palettes')
      .where({ id })
      .del();
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

app.patch('/api/v1/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(422).json('Please provide a name.');
    const matchingProjects = await database('projects').where({ id });
    if (!matchingProjects.length) return res.sendStatus(404);
    await database('projects')
      .where({ id })
      .update({ name });
    res.sendStatus(202);
  } catch {
    res.sendStatus(500);
  }
});

app.patch('/api/v1/palettes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(422).json('Please provide a name.');
    const matchingPalettes = await database('palettes').where({ id });
    if (!matchingPalettes.length) return res.sendStatus(404);
    await database('palettes')
      .where({ id })
      .update({ name });
    res.sendStatus(202);
  } catch {
    res.sendStatus(500);
  }
});

module.exports = app;
