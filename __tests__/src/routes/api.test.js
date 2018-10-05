'use strict';

import app from '../../../src/app';
import superagent from 'superagent';
import Coach from '../../../src/models/coach';
import dotenv from 'dotenv';
dotenv.config();

describe('API Router', () => {

  test('GET request proof of life', (done) => {
    expect.assertions(1);
    return superagent.get('http://localhost:3000/hello')
      .then(res => {

        expect(res.text).toBe('hello world');
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  // does the same as the above code!
  test('GET request proof of life', async () => {
    expect.assertions(1);
    await expect(superagent.get('http://localhost:3000/hello')).resolves.toHaveProperty('text', 'hello world');
  });
});

describe('TEAM model CRUD operation tests', () => {

  beforeAll(() => {
    mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(done => {
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

  /***********************************
  *    TEAM get requests     *
  ************************************/
  test('post to coach without a required value should return a 500 error', done => {
    let postData = {};
    return superagent.post('http://localhost:3000/team')
      .send(postData)
      .end((err, res) => {
        expect(res.status).toEqual(500);
        done();
      });
  });

  test('will respond with a 500 error when an invalid id is typed', done => {
    return superagent.get('http://localhost:3000/team/1234')
      .end((err, res) => {
        console.log(res.body);
        expect(res.status).toEqual(500);
        done();
      });
  });

  test('will respond with a 404 error when a get request is sent to  invalid path', done => {
    return superagent.get('http://localhost:3000/sfjaslkjf')
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
  });

  test('Will retrieve an team by userid', done => {
    let expected = {
      size: 0,
      _id: '5bb7a00c728a450641802acf',
      name: 'summit',
      city: 'bend',
      state: 'oregon',
      phone: '123-456-1234',
      email: 'sharonmillerdev@gmail.com',
    };

    return superagent.get('http://localhost:3000/team/5bb7a00c728a450641802acf')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(expected);
        done();
      });
  });

  test('Will retrieve an team by userid', done => {
    return superagent.get('http://localhost:3000/team/5bb7a00c728a450641802acf')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        done();
      });
  });
});

