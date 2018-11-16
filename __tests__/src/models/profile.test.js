'use strict';

import Profile from '../../../src/models/profile';


describe('Profile model schema tests', () => {

  test('should be invalid if profile name is empty', done => {
    let newProfile = new Profile();

    newProfile.validate(err => {
      expect(err.errors.firstName).toBeDefined();
      done();
    });
  });
  test('should be invalid if profile last name is empty', done => {
    let newProfile = new Profile();
    newProfile.validate(err => {
      expect(err.errors.lastName).toBeDefined();
      done();
    });
  });

  test('should create defualt bio if none is provided', () => {
    let newProfile = new Profile();
    newProfile.email = 'player@gmail.com';
    newProfile.firstName = 'Sharon';
    newProfile.lastName = 'Miller';

    expect(newProfile.bio).toBe('Hello!');
  });
});