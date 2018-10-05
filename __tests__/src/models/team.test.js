'use strict';

import Team from '../../../src/models/team';
import mongoose from 'mongoose';

describe('Team model tests', () => {
  
  test('should be invalid if name is empty', done => {
    let team = new Team();

    team.validate(err => {
      expect(err.errors.name).toBeDefined();
      done();
    });
  });

});