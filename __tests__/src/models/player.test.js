'use strict';

import Player from '../../../src/models/player';
import superagent from 'superagent';
import mongoose from 'mongoose';
import { doesNotReject } from 'assert';

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
});