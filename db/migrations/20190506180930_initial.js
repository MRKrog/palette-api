exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('projects', function(table) {
      table.increments('id').primary();
      table.string('name');
    }),

    knex.schema.createTable('palettes', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('project_id').unsigned()
      table.foreign('project_id')
        .references('projects.id');
    }),

    knex.schema.createTable('colors', function(table) {
      table.increments('id').primary();
      table.string('hex_code');
      table.integer('palette_id').unsigned()
      table.foreign('palette_id')
        .references('palettes.id');
    }),

  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('projects'),
    knex.schema.dropTable('palettes'),
    knex.schema.dropTable('colors')
  ]);
};
