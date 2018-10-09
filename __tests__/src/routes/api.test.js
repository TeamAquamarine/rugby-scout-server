'use strict';

require('babel-register');
import app from '../../../src/app';
import superagent from 'superagent';
import dotenv from 'dotenv';
dotenv.config();

describe('API Router', () => {

  const PORT = 8887;
  beforeAll(() => {
    console.log('Starting server for testing');
    app.start(PORT);

  });

  afterAll(() => {
    app.stop();
    console.log('testing server stopped');
  });

  test('GET request proof of life', (done) => {
    expect.assertions(1);
    return superagent.get(`http://localhost:${PORT}/hello`)
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
    await expect(superagent.get(`http://localhost:${PORT}/hello`)).resolves.toHaveProperty('text', 'hello world');
  });
});