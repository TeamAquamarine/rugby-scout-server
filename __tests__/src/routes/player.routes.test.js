'use strict';

import Player from '../../../src/models/player';
import superagent from 'superagent';
import mongoose from 'mongoose';
import { doesNotReject } from 'assert';

describe('Player model and CRUD operation tests', () => {

  test('should return a unique id when a player document is saved', done => {
    let postData = {
      firstName: 'Sharon',
      lastName: 'Miller',
    };
    return superagent.post('http://localhost:3000/player')
      .send(postData)
      .then(response => {
        expect(response.body).toHaveProperty('_id');
        done();
      })
      .catch(done);
  });

});

