'use strict';

import superagent from 'superagent';

describe('authRouter', () => {

  let mockBody = {
    username: 'alex2',
    password: 'password',
  };
  let authString = btoa(`${mockBody.username}:${mockBody.password}`);


  test('POST register request proof of life', (done) => {
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

  test('GET signin request proof of life', (done) => {
    expect.assertions(2);
    return superagent.get('http://localhost:3000/signin/')
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
