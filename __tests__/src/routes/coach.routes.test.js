'use strict';

import Coach from '../../../src/models/coach';
import superagent from 'superagent';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

describe('COACH model CRUD operation tests', () => {

  beforeAll(() => {
    mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(done => {
    Coach.remove({});
    mongoose.disconnect(done);
  });

  test('should return a unique id when a coach document is saved', () => {
    let postData = {
      firstName: 'Connor',
      lastName: 'Crossley',
    };
    return superagent.post('http://localhost:3000/coach')
      .send(postData)
      .then(response => {
        expect(response.body).toHaveProperty('_id');
      });

  });

  test(`should return a specific coach when passed a coach's id`, done => {
    let postData = {
      firstName: 'Alex',
      lastName: 'Hanson',
    };
    expect.assertions(5);
    return superagent.post('http://localhost:3000/coach')
      .send(postData)
      .then(response => {
        return superagent.get(`http://localhost:3000/coach/${response.body._id}`)
          .then(response => {
            expect(response.body._id).toBeDefined();
            expect(response.body.firstName).toBe('Alex');
            expect(response.body.lastName).toBe('Hanson');
            expect(response.body.bio).toBe('Hello!');
            expect(response.body.email).toBe('Not provided');
            done();
          })
          .catch(done);
      })
      .catch(done);
  });
});