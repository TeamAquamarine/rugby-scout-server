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

  test('should create a default email value if none is provided', () => {
    let coach = new Coach();

    expect(coach.email).toBe(`Not provided`);
  });

  test('should create a default phone number placeholder if none is provided', () => {
    let coach = new Coach();

    expect(coach.phone).toBe(`123.456.7890`);
  });

  test('should create a default win count and loss count of 0', () => {
    let coach = new Coach();

    expect(coach.wins).toBe(0);
    expect(coach.losses).toBe(0);
  });
});