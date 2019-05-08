const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

import request from 'supertest';
import '@babel/polyfill';
import app from './app';
import projects from './db/data/seedData.js'


describe('api', () => {

  beforeEach( async () => {
    await database.seed.run()
  });

  describe('get /concerts', () => {

    it('should return all concerts in the db', async () => {
      //
      // const expectedConcertsNumber = concerts.reduce((arr, index) => {
      //   arr += index.concerts.length;
      //   return arr;
      // }, 0);
      //
      // // execution
      // const response = await request(app).get('/api/v1/concerts');
      // const result = response.body;
      //
      // // // expectation
      // expect(response.status).toBe(200)
      // expect(result.length).toBe(expectedConcertsNumber)
    })

  })


  describe('get /bands/id', () => {

    it('should return a single band', async () => {
      // // setup
      // const expectedBand = await database('bands').first()
      // console.log('expectedBand', expectedBand);
      // const id = expectedBand.id
      // console.log('id', id);
      //
      // // execution
      // const response = await request(app).get(`/api/v1/bands/${id}`)
      // const result = response.body[0]
      // console.log('result', result);
      //
      // // expectation
      // expect(response.status).toBe(200)
      // expect(result.id).toEqual(expectedBand.id)
    })

  })

  describe('post /bands', () => {

    it('should post a new band', async () => {
      // const newBand = { name: 'Test Band', genre: 'band rock' }
      //
      // const response = await request(app).post('/api/v1/bands').send(newBand)
      // console.log('response',response.body);
      //
      // const bands = await database('bands').where('id', response.body.id).select()
      // console.log('bands',bands);
      // const band = bands[0]
      //
      // expect(response.status).toBe(201)
      // expect(band.name).toEqual(newBand.name)

    })

  })


  describe('delete /concert/id', () => {

    it('should delete a concert', async () => {
      //
      // const expectedConcert = await database('concerts').first()
      // const id = expectedConcert.id
      //
      // // let oldExpect = expectedConcertsNumber.length
      //
      // const response = await request(app).delete(`/api/v1/concerts/${id}`)
      //
      // const expectedConcertsNumber = concerts.reduce((arr, index) => {
      //   arr += index.concerts.length;
      //   return arr;
      // }, 0);
      //
      // let expecedNew = expectedConcertsNumber - 1;
      //
      // expect(expecedNew).toBe(33)
      // console.log(response.body);

    })

    it('should delete a concert and fail', async () => {
        // const badId = 1
        // const response = await request(app).delete(`/api/v1/concerts/${badId}`)
        //
        // expect(response.body.error).toBe(`Could not find or delete concert with id ${badId}`)
    })

  })

});
