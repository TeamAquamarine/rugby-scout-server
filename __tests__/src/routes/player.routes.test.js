'use strict';

import Player from '../../../src/models/player';
import superagent from 'superagent';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

describe('Player model and CRUD operation tests', () => {

  beforeAll(() => {
    mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(done => {
    mongoose.connection.dropCollection('players');
    mongoose.disconnect(done);
  });

  /***********************************
*     PLAYER POST CRUD     *
************************************/

  test('should return a unique id when a player document is saved', done => {
    let postData = {
      firstName: 'Zachary',
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
*     PLAYER GET CRUD     *
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
      bio: 'Hello!',
      firstName: 'Zach',
      lastName: 'Miller',
      email: 'zach@zach.com',
    };

    let player = new Player({
      firstName: 'Zach',
      lastName: 'Miller',
      email: 'zach@zach.com',
    });

    player.save()
      .then(data => {
        superagent.get(`http://localhost:3000/player/${data._id}`)
          .then(res => {
            expect(res.body._id).toBe(`${data._id}`);
            expect(res.body.bio).toEqual(expected.bio);
            expect(res.body.firstName).toEqual(expected.firstName);
            expect(res.body.lastName).toEqual(expected.lastName);
            expect(res.body.email).toEqual(expected.email);
            done();
          })
          .catch(done);
      })
      .catch(done);
  });



  /***********************************
  *    PLAYER PUT CRUD     *
  ************************************/
  describe('Coach PUT request', () => {

    let coach = {
      firstName: 'Sharon',
      lastName: 'Miller',
      email: 'sharon@email.com',
    };
    let id;
    superagent.post('http://localhost:3000/player')
      .send(coach)
      .then(res => {
        id = res.body._id;
      });

    test('should respond with the updated document', done => {
      expect.assertions(3);
      let updatedPlayer = {
        firstName: 'Gabe',
        lastName: 'Miller',
        email: 'coach@email.com',
      };

      return superagent.put(`http://localhost:3000/player/${id}`)
        .send(updatedPlayer)
        .then(res => {
          expect(res.body.firstName).toBe('Gabe');
          expect(res.body.lastName).toBe('Miller');
          expect(res.body.email).toBe('coach@email.com'),
            done();
        })
        .catch(done);
    });
  });


  /***********************************
   *    PLAYER DELETE CRUD     *
   ************************************/
  describe('Player DELETE request', () => {

    test('should delete a resource from the collection', done => {

      let player = {
        firstName: 'Sharon',
        lastName: 'Miller',
        email: 'sharon@email.com',
      };
      let data = new Player(player);
      data.save()
        .then(data => {
          superagent.delete(`http://localhost:3000/player/${data._id}`)
            .then(res => {
              expect(res.status).toBe(200);
              done();
            })
            .catch(done);
        });
    });
  });
});