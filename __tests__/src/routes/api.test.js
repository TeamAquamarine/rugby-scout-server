'use strict';

import app from '../../../src/app';
import superagent from 'superagent';

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
