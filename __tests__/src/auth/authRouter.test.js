'use strict';

import superagent from 'superagent';

describe('authRouter', () => {

  let mockBody = {
    username: 'alex2',
    password: 'password',
  };

  test('POST signup request proof of life', (done) => {
    expect.assertions(2);
    return superagent.post('http://localhost:3000/register/')
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
});