'use strict';

import Coach from '../../../src/models/coach';
import superagent from 'superagent';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

describe('COACH model CRUD operation tests', () => {

  beforeAll(() => {
    mongoose.connect('mongodb+srv://ccross:Cr0ssl3y@cluster0-iltfa.mongodb.net/midterm-dev');
  });

  afterAll(done => {
    mongoose.connection.dropCollection('coaches');
    mongoose.connection.dropCollection('users');
    mongoose.disconnect(done);
  });

  describe('Coach POST request', () => {

    test('should return a unique id when a coach document is saved', done => {
      let postData = {
        firstName: 'Connor',
        lastName: 'Crossley',
      };
      return superagent.post('http://localhost:3000/coach')
        .send(postData)
        .then(response => {
          expect(response.body).toHaveProperty('_id');
          done();
        })
        .catch(done);

    });
  });

  describe('Coach GET requests', () => {

    test(`should return a specific coach when passed a coach's id`, done => {
      let postData = {
        firstName: 'Alex',
        lastName: 'Hanson',
      };
      expect.assertions(5);
      return superagent.post('http://localhost:3000/coach')
        .send(postData)
        .then(response => {
          return superagent.get(`http://localhost:3000/coach/${response.body._id}`)
            .then(response => {
              expect(response.body._id).toBeDefined();
              expect(response.body.firstName).toBe('Alex');
              expect(response.body.lastName).toBe('Hanson');
              expect(response.body.bio).toBe('Hello!');
              expect(response.body.email).toBe('Not provided');
              done();
            })
            .catch(done);
        })
        .catch(done);
    });
  });

  describe('Coach PUT request', () => {

    let coach = {
      firstName: 'Sharon',
      lastName: 'Miller',
    };
    let id;
    superagent.post('http://localhost:3000/coach')
      .send(coach)
      .then(res => {
        id = res.body._id;
        console.log(id);
      });

    test('should respond with the updated document', done => {
      expect.assertions(2);
      // return superagent.post('http://localhost:3000/coach')
      //   .send(coach)
      //   .then(res => {
      //     expect(res.body._id).toBeDefined();


      //     expect.assertions(2);
      let updatedCoach = {
        firstName: 'Jessica',
        lastName: 'Hutchison',
      };

      return superagent.put(`http://localhost:3000/coach/${id}`)
        .send(updatedCoach)
        .then(res => {
          expect(res.body.firstName).toBe('Jessica');
          expect(res.body.lastName).toBe('Hutchison');
          done();
        })
        .catch(done);
    });
  });
});