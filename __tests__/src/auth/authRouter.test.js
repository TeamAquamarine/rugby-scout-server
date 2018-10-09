'use strict';
require('babel-register');
import mongoose from 'mongoose';
import app from '../../../src/app';
import superagent from 'superagent';

describe('authRouter', () => {
  
  const PORT = 8885;
  let server = false;
  beforeAll((done) => {
    mongoose.connect('mongodb://localhost:27017/midterm');
    console.log('Starting server for testing');
    // app.start(PORT);
    // done();
    server = app.listen(PORT, () => {
      done();
    });

  });

  afterAll(done => {
    mongoose.connection.dropCollection('users');
    server.close(done); 
    // app.stop();
    mongoose.disconnect(done);
    console.log('testing server stopped');
  });

  let mockBody = {
    username: 'alex2',
    password: 'password'
  };
  let authString = btoa(`${mockBody.username}:${mockBody.password}`);


  test('POST register request proof of life', (done) => {
    // expect.assertions(2);
    return superagent.post(`http://localhost:${PORT}/register/`)
      .send(mockBody)
      .accept('application/JSON')
      .then(res => {
        console.log('this is RES BODY:', res.body);
        expect(typeof res.body).toBe('object');
        expect(res.status).toBe(200);
        done();
      })
      .catch(err => {
        console.log('IM AN ERROR!!!');
        done(err);
      });
  });

  test('GET signin request proof of life', (done) => {
    // expect.assertions(2);
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
