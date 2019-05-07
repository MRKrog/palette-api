const seedData = require('../../data/seedData.js');

const createProjects = (knex, project) => {
  return knex('projects').insert({
    name: project.name,
  }, 'id')
  .then(project_id => {
    let palettePromises = [];

    project.palettes.forEach(palette => {
      palettePromises.push(
        createPalettes(knex, {
          name: palette.name,
          project_id: project_id[0]
        }, palette.colors)
      )
    });

    return Promise.all(palettePromises);
  })
};

const createPalettes = (knex, palette, colors) => {
  return knex('palettes').insert(palette, 'id')
    .then(palette_id => {

      let colorPromises = [];

      colors.forEach(color => {
        colorPromises.push(
          createColors(knex, {
            hex_code: color.hex_code,
            palette_id: palette_id[0]
          })
        )
      });

      return Promise.all(colorPromises);
    });
};

const createColors = (knex, color) => {
  return knex('colors').insert(color);
};

exports.seed = (knex, Promise) => {
  return knex('colors').del()
    .then(() => knex('palettes').del())
    .then(() => knex('projects').del())
    .then(() => {

      let projectPromises = [];

      seedData.forEach(project => {
        projectPromises.push(createProjects(knex, project));
      });

      return Promise.all(projectPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
