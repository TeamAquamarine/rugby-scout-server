'use strict';

import superagent from 'superagent';
import app from '../../../src/app';
import mongoose from 'mongoose';

describe('authRouter', () => {
  
  const PORT = 8890;
  beforeAll(() => {
    console.log('Starting server for testing');
    app.start(PORT);
    mongoose.connect(process.env.MONGODB_URI);

  });

  afterAll(done => {
    mongoose.connection.dropCollection('teams');
    mongoose.disconnect(done);
    app.stop();
    console.log('testing server stopped');
  });

  let mockBody = {
    username: 'alex2',
    password: 'password',
  };
  let authString = btoa(`${mockBody.username}:${mockBody.password}`);


  test('POST register request proof of life', (done) => {
    expect.assertions(2);
    return superagent.post(`http://localhost:${PORT}/register/`)
      .send(mockBody)
      .accept('application/JSON')
      .then(res => {
        expect(typeof res.body).toBe('object');
        expect(res.status).toBe(200);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  test('GET signin request proof of life', (done) => {
    expect.assertions(2);
    return superagent.get(`http://localhost:${PORT}/signin/`)
      .set('Authorization', 'basic ' + authString)
      .send(mockBody)
      .then(res => {
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});
