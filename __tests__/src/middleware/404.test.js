'use strict';

import notFound from '../../../src/middleware/404';

describe('404 middleware tests', () => {

  test('should respond with 404 status code', () => {

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
    notFound(req, res, next);

    expect(res.statusCode).toBe(404);
  });
});