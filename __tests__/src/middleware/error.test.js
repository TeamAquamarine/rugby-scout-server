'use strict';

import errorWare from '../../../src/middleware/error';

describe('error.js Tests', () => {

  let errorString = 'this is an error';
  let errorObject = { error: 'this is an error object' };
  let req = {};
  let res = {};

  res.setHeader = function (header, value) {
    res.header = { header: value };
  };

  res.write = function (content) {
    res.body = content;
  };

  res.end = jest.fn();

  let next = jest.fn();

  test('Should set res.status to 500 when passed an error string', () => {

    errorWare(errorString, req, res, next);

    expect(res.statusCode).toBe(500);
  });

  test('Should set res.status to 500 when passed an error object', () => {

    errorWare(errorObject, req, res, next);

    expect(res.statusCode).toBe(500);
  });

  test('Should respond with an error message', () => {
    errorWare(errorString, req, res, next);

    expect(res.statusMessage).toBeDefined();
  });

  test('Should send an error back on the res.body', () => {
    errorWare(errorString, req, res, next);

    expect(res.body).toBeDefined();
  });
});