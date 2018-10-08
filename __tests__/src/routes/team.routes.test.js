'use strict';

import Team from '../../../src/models/team';
import superagent from 'superagent';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

describe('TEAM model CRUD operation tests', () => {

  beforeAll(() => {
    mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(done => {
    mongoose.connection.dropCollection('teams');
    mongoose.disconnect(done);
  });

  /***********************************
*     TEAM POST CRUD     *
************************************/
  describe('TEAM model CRUD operation tests', () => {
    test('POST team and return an ID when document is saved', () => {
      let postData = {
        name: 'mt view',
        city: 'bend',
        state: 'oregon',
        phone: '543-345-3434',
        email: 'mycoach@coach.com',
      };
      return superagent.post('http://localhost:3000/team')
        .send(postData)
        .then(response => {
          expect(response.body).toHaveProperty('_id');
        });
    });

    test('POST team without a required field and recieve error response', done => {
      let postData = {
        name: 'mt view',
        city: 'bend',
        state: 'oregon',
        phone: '543-345-3434',
      };
      return superagent.post('http://localhost:3000/team')
        .send(postData)
        .end((err, res) => {
          expect(res.status).toEqual(500);
          done();
        });
    });

  });

  test('should return a 500 server error when post made to coach without a required value', done => {
    let postData = {};
    return superagent.post('http://localhost:3000/team')
      .send(postData)
      .end((err, res) => {
        expect(res.status).toEqual(500);
        done();
      });
  });
  /***********************************
  *    TEAM get requests     *
  ************************************/

  test('should respond with a 500 error when an invalid id is typed', done => {
    return superagent.get('http://localhost:3000/team/1234')
      .end((err, res) => {
        console.log(res.body);
        expect(res.status).toEqual(500);
        done();
      });
  });

  test('should respond with a 404 error when a get request is sent to  invalid path', done => {
    return superagent.get('http://localhost:3000/sfjaslkjf')
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
  });

  test('Should retrieve a team by userid', done => {
    let team = new Team({
      name: 'Summit',
      city: 'Bend',
      state: 'OR',
      email: 'mycoach@coach.com',
      phone: '555-555-5555',
    });

    team.save()
      .then(data => {
        superagent.get(`http://localhost:3000/team/${data._id}`)
          .then(res => {
            let expected = data._id.toString();
            expect(res.body._id).toEqual(expected);
            done();
          })
          .catch(done);
      })
      .catch(done);

  });
  /***********************************
    *   TEAM PUT CRUD     *
    ************************************/
  test('Should update a current document', done => {
    let expected = {
      size: 0,
      _id: '5bb7a00c728a450641802acf',
      name: 'bestCoach',
      city: 'bend',
      state: 'oregon',
      phone: '123-456-1234',
      email: 'sharonmillerdev@gmail.com',
    };

    let updateData = {
      size: 0,
      _id: '5bb7a00c728a450641802acf',
      name: 'bestCoach',
      city: 'bend',
      state: 'oregon',
      phone: '123-456-1234',
      email: 'sharonmillerdev@gmail.com',
    };

    return superagent.put('http://localhost:3000/team/5bb7a00c728a450641802acf')
      .send(updateData)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(expected);
        done();
      });

  });

  /***********************************
*    TEAM PUT CRUD     *
************************************/
  describe('TEAN PUT request', () => {

    let team = {
      name: 'Bend Lava Bears',
      city: 'bend',
      state: 'oregon',
      phone: '123-456-1234',
      email: 'sharonmillerdev@gmail.com',
    };
    let id;
    superagent.post('http://localhost:3000/team')
      .send(team)
      .then(res => {
        id = res.body._id;
      });

    test('should respond with the updated document', done => {
      expect.assertions(3);
      let updatedTeam = {
        name: 'Summit Winners',
        city: 'Bend',
        email: 'team@email.com',
      };

      return superagent.put(`http://localhost:3000/team/${id}`)
        .send(updatedTeam)
        .then(res => {
          expect(res.body.name).toBe('Summit Winners');
          expect(res.body.city).toBe('Bend');
          expect(res.body.email).toBe('team@email.com');
          done();
        })
        .catch(done);
    });
  });


  /***********************************
   *    TEAM DELETE CRUD     *
   ************************************/
  describe('Team DELETE request', () => {

    test('should delete a resource from the collection', done => {

      let team = {
        name: 'Sharon',
        email: 'sharon@email.com',
        state: 'OR',
        city: 'Bend',
      };
      let data = new Team(team);
      data.save()
        .then(data => {
          superagent.delete(`http://localhost:3000/team/${data._id}`)
            .then(res => {
              expect(res.status).toBe(200);
              done();
            })
            .catch(done);
        });
    });
  });

});
