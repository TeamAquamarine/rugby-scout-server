'use strict';

jest.mock('require-dir');

import modelFinder from './../../../src/middleware/modelFinder';

describe('modelFinder Middleware test', () => {

  test('should throw an error if no valid model is included in the request', () => {
    let req = {}, res = {};
    let next = () => { };

    expect(() => {
      modelFinder(req, res, next);
    }).toThrow();
  });

  test('should set the req.model to be the expected model function provided in the req', () => {
    let req = { params: { model: 'coach' } }, res = {};
    let next = () => { };

    modelFinder(req, res, next);
    expect(req.model).toBeDefined();
  });
});