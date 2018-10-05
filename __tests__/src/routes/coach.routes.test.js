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
});