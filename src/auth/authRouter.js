'use strict';

import User from './user';
import express from 'express';
import auth from './middleware';
import authorize from './lib/oauth';
import cors from 'cors';

const authRouter = express.Router();

authRouter.post('/register', cors(), (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.send(user.generateToken());
    })
    .catch(next);
});

authRouter.get('/login', auth, (req, res, next) => {
  res.send(req.token);
});

authRouter.get('/oauth', (req, res, next) => {
  authorize(req)
    .then(token => {
      res.cookie('token', token);
      res.redirect(process.env.REDIRECT_CLIENT_URI);
    })
    .catch(err => console.error(err));
});
export default authRouter;
