const request = require('supertest');
const app = require('./app');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

describe('api', () => {
  beforeEach(async () => {
    await database.seed.run();
  });

  describe('GET /api/v1/projects', () => {
    it('should return 200 and all projects in the database', async () => {
      const expected = await database('projects').select();
      const response = await request(app).get('/api/v1/projects');
      expect(response.status).toEqual(200);
      expect(response.body.length).toEqual(expected.length);
    });
  });

  describe('GET /api/v1/palettes', () => {
    it('should return 200 and match palettes', async () => {
      const expected = await database('palettes').select();
      const response = await request(app).get('/api/v1/palettes');
      expect(response.status).toEqual(200);
      expect(response.body.length).toEqual(expected.length);
    });

    it('should return a single palette if the match params matches the name', async () => {
      const expected = await database('palettes').select();
      const response = await request(app).get('/api/v1/palettes?name=Cool%20Tones');
      expect(response.status).toEqual(200);
      expect(response.body.length + 1).toEqual(expected.length);
    })
  });

  describe('GET /api/v1/projects/:id', () => {
    it('should return specific project from the db', async () => {
      const expectedProject = await database('projects').first();
      const id = expectedProject.id;
      const response = await request(app).get(`/api/v1/projects/${id}`);
      expect(response.body.name).toEqual(expectedProject.name);
    });

    it('should return a status of 404 if project is not in db', async () => {
      const id = 0;
      const response = await request(app).get(`/api/v1/projects/${id}`);
      const status = response.status;
      expect(status).toBe(404);
    });
  });

  describe('GET /palette/:id', () => {
    it('should return a specific palette from the db', async () => {
      const expectedPalette = await database('palettes').first();
      const id = expectedPalette.id;
      const response = await request(app).get(`/api/v1/palettes/${id}`);
      expect(response.body.name).toEqual(expectedPalette.name);
    });

    it('should return a status of 404 if pallet is not in db', async () => {
      const id = 0;
      const response = await request(app).get(`/api/v1/palettes/${id}`);
      const status = response.status;
      expect(status).toBe(404);
    });
  });

  describe('POST /api/v1/projects', () => {
    it('should return 201 and the project id', async () => {
      const response = await request(app)
        .post('/api/v1/projects')
        .send({ name: 'Test Project' });
      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty('id');
    });

    it('should add a project to the database', async () => {
      const preProjects = await database('projects').select();
      await request(app)
        .post('/api/v1/projects')
        .send({ name: 'Test Project' });
      const postProjects = await database('projects').select();
      expect(postProjects.length).toEqual(preProjects.length + 1);
    });

    it('should return 422 if no name is sent', async () => {
      const response = await request(app)
        .post('/api/v1/projects')
        .send({});
      expect(response.status).toEqual(422);
    });
  });

  describe('POST /api/v1/palettes', () => {
    let mockPalette;

    beforeEach(async () => {
      const { id: project_id } = await database('projects').first();
      mockPalette = {
        name: 'Mock Palette',
        color_1: '#FFFFF',
        color_2: '#FFFFF',
        color_3: '#FFFFF',
        color_4: '#FFFFF',
        color_5: '#FFFFF',
        project_id
      };
    });

    it('should return 201 and the palette id', async () => {
      const response = await request(app)
        .post('/api/v1/palettes')
        .send(mockPalette);
      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty('id');
    });

    it('should add a palette to the database', async () => {
      const prePalettes = await database('palettes').select();
      await request(app)
        .post('/api/v1/palettes')
        .send(mockPalette);
      const postPalettes = await database('palettes').select();
      expect(postPalettes.length).toEqual(prePalettes.length + 1);
    });

    it('should return 422 if certain params are missing', async () => {
      const response = await request(app)
        .post('/api/v1/palettes')
        .send({});
      expect(response.status).toEqual(422);
    });
  });

  describe('PATCH /api/v1/projects/:id', () => {
    it('should return 202 if the correct parameters are sent', async () => {
      const { id } = await database('projects').first();
      const response = await request(app)
        .patch(`/api/v1/projects/${id}`)
        .send({ name: 'Updated Project' });
      expect(response.status).toEqual(202);
    });

    it('should edit the project name in the database', async () => {
      const expected = await database('projects').first();
      expect(expected.name).not.toEqual('Updated Project');
      await request(app)
        .patch(`/api/v1/projects/${expected.id}`)
        .send({ name: 'Updated Project' });
      const [result] = await database('projects').where({ id: expected.id });
      expect(result.name).toEqual('Updated Project');
    });

    it('should return 422 if name parameter is not sent', async () => {
      const { id } = await database('projects').first();
      const response = await request(app)
        .patch(`/api/v1/projects/${id}`)
        .send({});
      expect(response.status).toEqual(422);
    });

    it('should return 404 if no matching project is found', async () => {
      const response = await request(app)
        .patch(`/api/v1/projects/0`)
        .send({ name: 'Updated Project' });
      expect(response.status).toEqual(404);
    });
  });

  describe('PATCH /api/v1/palettes/:id', () => {
    it('should return 202 if the correct params are sent', async () => {
      const { id } = await database('palettes').first();
      const response = await request(app)
        .patch(`/api/v1/palettes/${id}`)
        .send({ name: 'Updated Project' });
      expect(response.status).toEqual(202);
    });

    it('should edit the name of a palette in the database', async () => {
      const expected = await database('palettes').first();
      expect(expected.name).not.toEqual('Updated Project');
      await request(app)
        .patch(`/api/v1/palettes/${expected.id}`)
        .send({ name: 'Updated Project' });
      const [result] = await database('palettes').where({ id: expected.id });
      expect(result.name).toEqual('Updated Project');
    });

    it('should return 422 if the name param is not sent', async () => {
      const { id } = await database('palettes').first();
      const response = await request(app)
        .patch(`/api/v1/palettes/${id}`)
        .send();
      expect(response.status).toEqual(422);
    });

    it('should return 404 if no matching palette is found', async () => {
      const response = await request(app)
        .patch(`/api/v1/palettes/0`)
        .send({ name: 'Updated Project' });
      expect(response.status).toEqual(404);
    });
  });

  describe('DELETE /api/v1/projects/:id', () => {
    it('should return 204 if a project matches the id', async () => {
      const { id } = await database('projects').first();
      const response = await request(app).delete(`/api/v1/projects/${id}`);
      expect(response.status).toEqual(204);
    });

    it('should remove a project from the database', async () => {
      const { id } = await database('projects').first();
      const preProjects = await database('projects').select();
      await request(app).delete(`/api/v1/projects/${id}`);
      const postProjects = await database('projects').select();
      expect(postProjects.length).toEqual(preProjects.length - 1);
    });

    it('should remove associated palettes from the database', async () => {
      const { id } = await database('projects').first();
      const prePalettes = await database('palettes').where({ project_id: id });
      expect(prePalettes.length).not.toEqual(0);
      await request(app).delete(`/api/v1/projects/${id}`);
      const postPalettes = await database('palettes').where({ project_id: id });
      expect(postPalettes.length).toEqual(0);
    });

    it('should return 404 if no project is found', async () => {
      const response = await request(app).delete('/api/v1/projects/0');
      expect(response.status).toEqual(404);
    });
  });

  describe('DELETE /api/v1/palettes/:id', () => {
    it('should return 204 if a palette matches the id', async () => {
      const { id } = await database('palettes').first();
      const response = await request(app).delete(`/api/v1/palettes/${id}`);
      expect(response.status).toEqual(204);
    });

    it('should remove a palette from the database', async () => {
      const { id } = await database('palettes').first();
      const prePalettes = await database('palettes').select();
      await request(app).delete(`/api/v1/palettes/${id}`);
      const postPalletes = await database('palettes').select();
      expect(postPalletes.length).toEqual(prePalettes.length - 1);
    });

    it('should return 404 if no palette is found', async () => {
      const response = await request(app).delete('/api/v1/palettes/0');
      expect(response.status).toEqual(404);
    });
  });
});
