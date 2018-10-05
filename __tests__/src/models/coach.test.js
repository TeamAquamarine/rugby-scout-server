'use strict';

import Coach from '../../../src/models/coach';
import mongoose from 'mongoose';

describe('Coach model tests', () => {

  test('should be invalid if firstName is empty', done => {
    let coach = new Coach();

    coach.validate(err => {
      expect(err.errors.firstName).toBeDefined();
      done();
    });
  });

  test('should be invalid if lastName is empty', done => {
    let coach = new Coach();

    coach.validate(err => {
      expect(err.errors.lastName).toBeDefined();
      done();
    });
  });

  test('should create a default bio if none is provided', () => {
    let coach = new Coach();

    expect(coach.bio).toBe(`Hello!`);
  });
});