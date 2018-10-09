'use strict';

import auth from '../../../src/auth/middleware';

jest.mock('../../../src/auth/user');




describe('authentication middleware', () => {

  test('should pass if given username and password', (done) => {
    let username = 'alex2';
    let password = 'password';
    let authType = 'basic';
    let reqHeaderString = btoa(`${username}: ${password}`);
    let req = {headers: {authorization: `${authType} ${reqHeaderString}`}};
    let res = {};

    return auth(req, res, () =>{
      expect(req.token).toBe('tokenReturned');
      done();
    });
  });

  test('should fail without header', () => {
    let username = 'alex2';
    let password = 'password';
    let authType = 'basic';
    let reqHeaderString = btoa(`${username}: ${password}`);
    let req = {headers:''};
    let res = {};
    
    expect(() => auth(req, res, ()=> {})).toThrow('No header present');
  });

  test('should fail with bad header type', () => {
    let username = 'alex2';
    let password = 'password';
    let authType = 'hacker';
    let reqHeaderString = btoa(`${username}: ${password}`);
    let req = {headers: {authorization: `${authType} ${reqHeaderString}`}};
    let res = {};
    
    expect(() => auth(req, res, ()=> {})).toThrow('Unknown header');
  });

});

describe('authorization middleware', () => {

  test('should pass if given good token', (done) => {
    let authType = 'bearer';
    let token = 'good token';
    let reqHeaderString = btoa(`${token}`);
    let req = {headers: {authorization: `${authType} ${reqHeaderString}`}};
    let res = {};

    return auth(req, res, () =>{
      expect(req.user).toBeDefined();
      done();
    });
  });
});