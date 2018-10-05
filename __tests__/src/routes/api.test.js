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
  test('post to coach without a required value should return a 500 error', done => {
    let postData = {};
    return superagent.post('http://localhost:3000/team')
      .send(postData)
      .end((err, res) => {
        expect(res.status).toEqual(500);
        done();
      });
  });
});

describe('TEAM model CRUD operation tests', () => {
  test('POST team and return an ID when document is saved', () => {
    let postData = {
      name: 'mt view',
      city: 'bend',
      state: 'oregon',
      phone: '543-345-3434',
      email: 'mycoach@coach.com',
    };
    return superagent.post('http://localhost:3000/team')
      .send(postData)
      .then(response => {
        expect(response.body).toHaveProperty('_id');
      });
  });
  test('POST team without a required field and recieve error response', done => {
    let postData = {
      name: 'mt view',
      city: 'bend',
      state: 'oregon',
      phone: '543-345-3434',
    };
    return superagent.post('http://localhost:3000/team')
      .send(postData)
      .end((err, res) => {
        expect(res.status).toEqual(500);
        done();
      });
  });
});