'use strict';

import Player from '../../../src/models/player';
import superagent from 'superagent';
import mongoose from 'mongoose';
import { doesNotReject } from 'assert';

describe('Player model and CRUD operation tests', () => {

  /***********************************
*     TEAM POST CRUD     *
************************************/
  test('should return a unique id when a player document is saved', done => {
    let postData = {
      firstName: 'Zach',
      lastName: 'Miller',
      email: 'coachzach@coach.com',
    };
    return superagent.post('http://localhost:3000/player')
      .send(postData)
      .then(response => {
        expect(response.body).toHaveProperty('_id');
        done();
      })
      .catch(done);
  });

  test('should return a 500 error when required email is not inlcuded', done => {
    let postData = {
      firstName: 'Zach',
      lastName: 'Miller',
    };
    return superagent.post('http://localhost:3000/player')
      .send(postData)
      .end((err, res) => {
        expect(res.status).toEqual(500);
        done();
      });
  });

  /***********************************
*     TEAM GET CRUD     *
************************************/
  test('should return a 500 error when a request is made to an invalid id', done => {
    return superagent.get('http://localhost:3000/player/1234')
      .end((err, res) => {
        expect(res.status).toEqual(500);
        done();
      });
  });


  test('should retrieve a player by userid', done => {
    let expected = {
      __v: 0,
      _id: '5bba82bb305bd21d8f432e4b',
      bio: 'Hello!',
      firstName: 'Zach',
      lastName: 'Miller',
      email: 'coachzach@coach.com',
    };
    return superagent.get('http://localhost:3000/player/5bba82bb305bd21d8f432e4b')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(expected);
        done();
      });
  });

});