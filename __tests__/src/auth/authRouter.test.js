'use strict';

import superagent from 'superagent';

describe('API Router', () => {

  test('GET signup request proof of life', (done) => {
    expect.assertions(1);
    return superagent.get('http://localhost:3000/signup')
      .then(res => {

        expect(res.status).toBe(200);
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});