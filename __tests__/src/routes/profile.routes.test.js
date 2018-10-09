'use strict';

require('babel-register');
import app from '../../../src/app';
import Profile from '../../../src/models/profile';
import superagent from 'superagent';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

describe('Profile model and CRUD operation tests', () => {

  const PORT = 3000;
  let userId;
  beforeAll(() => {
    console.log('Starting server for testing');
    app.start(PORT);
    mongoose.connect(process.env.MONGODB_URI);

    superagent.post(`http://localhost:${PORT}/register`)
      .send({ username: 'admin', password: 'password' })
      .then(data => {
        userId = data._id;
      });

  });

  afterAll(done => {
    mongoose.connection.dropCollection('profiles');
    mongoose.disconnect(done);
    app.stop();
    console.log('testing server stopped');
  });

  /***********************************
*     PROFILE POST CRUD     *
************************************/

  test('should return a unique id when a profile document is saved', done => {
    let postData = {
      firstName: 'Zachary',
      lastName: 'Miller',
      email: 'coachzach@coach.com',
      user: userId,
    };
    return superagent.post('http://localhost:3000/profile')
      .send(postData)
      .then(response => {
        expect(response.body).toHaveProperty('_id');
        done();
      })
      .catch(done);
  });


  /***********************************
*     PLAYER GET CRUD     *
************************************/
  test('should return a 500 error when a request is made to an invalid id', done => {
    return superagent.get('http://localhost:3000/profile/1234')
      .end((err, res) => {
        expect(res.status).toEqual(500);
        done();
      });
  });


  test('should retrieve a profile by userid', done => {
    let expected = {
      bio: 'Hello!',
      firstName: 'Zach',
      lastName: 'Miller',
      email: 'zach@zach.com',
    };

    let profile = new Profile({
      firstName: 'Zach',
      lastName: 'Miller',
      email: 'zach@zach.com',
      user: userId,
    });

    profile.save()
      .then(data => {
        superagent.get(`http://localhost:3000/profile/${data._id}`)
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
  *    PROFILE PUT CRUD     *
  ************************************/
  describe('Coach PUT request', () => {

    let coach = {
      firstName: 'Sharon',
      lastName: 'Miller',
      email: 'sharon@email.com',
      user: userId,
    };
    let id;
    superagent.post('http://localhost:3000/profile')
      .send(coach)
      .then(res => {
        id = res.body._id;
      });

    test('should respond with the updated document', done => {
      expect.assertions(3);
      let updatedProfile = {
        firstName: 'Gabe',
        lastName: 'Miller',
        email: 'coach@email.com',
      };

      return superagent.put(`http://localhost:3000/profile/${id}`)
        .send(updatedProfile)
        .then(res => {
          expect(res.body.firstName).toBe('Gabe');
          expect(res.body.lastName).toBe('Miller');
          expect(res.body.email).toBe('coach@email.com');
          done();
        })
        .catch(done);
    });
  });

  /***********************************
   *    PLAYER DELETE CRUD     *
   ************************************/
  describe('Profile DELETE request', () => {

    test('should delete a resource from the collection', done => {

      let profile = {
        firstName: 'Sharon',
        lastName: 'Miller',
        email: 'sharon@email.com',
        user: userId,
      };
      let data = new Profile(profile);
      data.save()
        .then(data => {
          superagent.delete(`http://localhost:3000/profile/${data._id}`)
            .then(res => {
              expect(res.status).toBe(200);
              done();
            })
            .catch(done);
        });
    });
  });
});