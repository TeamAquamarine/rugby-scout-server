'use strict';

import User from '../../../src/auth/model';
import mongoose, { mongo } from 'mongoose';


describe('User model tests', () => {

  beforeAll(done => {
    mongoose.connect('mongodb://localhost/testUsers');
    done();
  });

  afterAll(done => {
    mongoose.disconnect();
    done();
  });

  test('should be invalid if firstName is empty', done => {
    let user = new User();

    user.validate(err => {
      expect(err.errors.username).toBeDefined();
      expect(err.errors.password).toBeDefined();
      done();
    });
  });

  test('get hashedpassword on user save', () => {

    //create a mock
    // where an object is returned with a function called "hash"
    // this function takes a password, and salt
    // return a string different than password provided
    let password = 'myPassword';
    let salt = 5;
    
    let user = new User({
      username: 'adam',
      password: password,
    });

    // user.hashPassword = jest.fn((password, salt) => password + salt );

    user.hashPassword(5, () => {
      expect(password).not.toBe(this.password);
    });
  });

});