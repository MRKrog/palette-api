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

// Works
// Get All Projects
app.get('/api/v1/projects', async (req, res) => {
  try {
    const projects = await database('projects').select();
    if (!projects.length) return res.status(404).json('Projects Not Found');
    res.status(200).json(projects);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Works
// Grab All Palettes
app.get('/api/v1/palettes', async (req, res) => {
  try {
    const palettes = await database('palettes').select();
    if (!palettes.length) return res.status(404).json('Palettes Not Found');
    res.status(200).json(palettes);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Works
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

// Works
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

// Works
// Create a new project
app.post('/api/v1/projects', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(422).json('Please enter project name.');
    const id = await database('projects').insert({ name }, 'id');
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Works
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

// Works
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
    res.status(204).json('Project Deleted');
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Works
// Delete Palette
app.delete('/api/v1/palettes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const matchingPalettes = await database('palettes').where({ id });
    if (!matchingPalettes.length) return res.sendStatus(404);
    await database('palettes')
      .where({ id })
      .del();
    res.status(204).json('Palette Deleted');
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Works
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
    res.status(202).json('Name Updated Successfully');
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Works
app.patch('/api/v1/palettes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    console.log(req.body);
    if (!name) return res.status(422).json('Please provide a name.');
    const matchingPalettes = await database('palettes').where({ id });
    if (!matchingPalettes.length) return res.sendStatus(404);
    await database('palettes')
      .where({ id })
      .update({ name });
    res.status(202).json('Name Updated Successfully');
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = app;
