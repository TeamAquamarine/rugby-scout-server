'use strict';

import auth from '../../../src/auth/middleware';

jest.mock('../../../src/auth/user');

let username;
let password;
let authType;
let reqHeaderString = btoa(`${username}: ${password}`);
let req = {headers: {authorization: `${authType} ${reqHeaderString}`}};
let res = {};


describe('authentication middleware', () => {

  test('should pass if given username and password', (done) => {
    username = 'alex2';
    password = 'password';
    authType = 'basic';
    console.log(req);
    let next = () => {
      expect(req.token).toBe('tokenReturned');
      done();
    };
    auth(req, res, next);
  });
});

describe('authorization middleware', () => {

  test('', () => {

  });
});