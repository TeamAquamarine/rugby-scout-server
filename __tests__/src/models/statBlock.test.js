'use strict';

import StatBlock from '../../../src/models/statBlock';

describe('StatBlock Model constructor tests', () => {

  test('should be invalid if user Id is not provided', done => {
    let statBlock = new StatBlock();

    statBlock.validate(err => {
      expect(err.errors.user).toBeDefined();
      done();
    });
  });

  test('should initialize a _id provided by mongoose', done => {
    let statBlock = new StatBlock();

    expect(statBlock._id).toBeDefined();
    done();
  });

  test('should initialize all stats with a 0 default if no value provided', done => {
    let statBlock = new StatBlock();

    Object.keys(statBlock._doc).forEach(property => {
      if (property !== 'user' && property !== '_id') {
        expect(statBlock._doc[property]).toBe(0);
      }
    });

    done();
  });
});