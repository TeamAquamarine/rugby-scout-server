'use strict';

import Coach from '../../../src/models/coach';
import mongoose, { mongo } from 'mongoose';

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

describe('MONGO interactions', () => {

  beforeAll(() => {
    mongoose.connect(process.env.MONGODB_URI_DEV);

  });

  beforeEach(() => {
    let coach = new Coach({
      firstName: 'Connor',
      lastName: 'Crossley',
    });

    return coach.save();
  });

  afterEach(() => {
    return Coach.remove({});
  });

  afterAll(done => {
    mongoose.disconnect(done);
  });

  test('saving a coach document should provide the document with an id', done => {
    Coach.findOne({ firstName: 'Connor' })
      .then(coach => {
        expect(coach._id).toBeDefined();
        done();
      })
      .catch(err => console.error(err));
  });
});