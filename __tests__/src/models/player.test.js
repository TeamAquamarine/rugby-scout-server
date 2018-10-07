'use strict';

import Player from '../../../src/models/player';
import superagent from 'superagent';
import mongoose from 'mongoose';
import { doesNotReject } from 'assert';
import { getMaxListeners } from 'cluster';

describe('Player model schema tests', () => {

  test('should be invalid if player name is empty', done => {
    let newPlayer = new Player();

    newPlayer.validate(err => {
      expect(err.errors.firstName).toBeDefined();
      done();
    });
  });
  test('should be invalid if player last name is empty', done => {
    let newPlayer = new Player();
    newPlayer.validate(err => {
      expect(err.errors.lastName).toBeDefined();
      done();
    });
  });

  test('should return invalid if email address is empty', done => {
    let newPlayer = new Player();

    newPlayer.validate(err => {
      expect(err.errors.email).toBeDefined();
      done();
    });
  });

  test('should create defualt bio if none is provided', () => {
    let newPlayer = new Player();
    newPlayer.email = 'player@gmail.com';
    newPlayer.firstName = 'Sharon';
    newPlayer.lastName = 'Miller';

    expect(newPlayer.bio).toBe('Hello!');
  });
});