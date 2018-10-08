'use strict';

import StatBlock from '../../../src/models/statBlock';

describe('StatBlock Model constructor tests', () => {

  test('should be invalid if player Id is not provided', done => {
    let statBlock = new StatBlock();

    statBlock.validate(err => {
      expect(err.errors.player).toBeDefined();
      done();
    });
  });
});