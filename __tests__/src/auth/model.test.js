'use strict';

import User from '../../../src/auth/model';
import mongoose from 'mongoose';

describe('User model tests', () => {

  test('should be invalid if firstName is empty', done => {
    let user = new User();

    user.validate(err => {
      expect(err.errors.username).toBeDefined();
      done();
    });
  });

  test('should be invalid if lastName is empty', done => {
    let user = new User();

    user.validate(err => {
      expect(err.errors.password).toBeDefined();
      done();
    });
  });
});