'use strict';

import app from '../../../src/app';
import superagent from 'superagent';
import mongoose from 'mongoose';
import Coach from '../../../src/models/coach';
import dotenv from 'dotenv';
dotenv.config();

describe('API Router', () => {

  test('GET request proof of life', (done) => {
    expect.assertions(1);
    return superagent.get('http://localhost:3000/hello')
      .then(res => {

        expect(res.text).toBe('hello world');
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  // does the same as the above code!
  test('GET request proof of life', async () => {
    expect.assertions(1);
    await expect(superagent.get('http://localhost:3000/hello')).resolves.toHaveProperty('text', 'hello world');
  });
});

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