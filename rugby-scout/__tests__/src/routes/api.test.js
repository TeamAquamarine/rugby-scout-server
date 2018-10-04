'use strict';

import app from '../../../src/app';
import superagent from 'superagent';

describe('API Router', () => {

  test('GET request proof of life', (done) => {
    expect.assertions(1);
    return superagent.get('http://localhost:3000/hello')
      .then(res => {

        expect(res.text).toBe('hello sdfasdfworld');
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});
