'use strict';

import StatBlock from '../../../src/models/statBlock';
import { stat } from 'fs';

describe('StatBlock Model constructor tests', () => {

  test('should be invalid if player Id is not provided', done => {
    let statBlock = new StatBlock();

    statBlock.validate(err => {
      expect(err.errors.player).toBeDefined();
      done();
    });
  });

  test('should initialize all stats with a 0 default if no value provided', done => {
    let statBlock = new StatBlock();

    Object.keys(statBlock._doc).forEach(property => {
      if (property !== 'player' && property !== '_id') {
        expect(statBlock._doc[property]).toBe(0);
      }
    });

    done();
  });
});