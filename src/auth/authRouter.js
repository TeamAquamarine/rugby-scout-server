'use strict';

import User from './model';
import express from 'express';
import auth from './middleware';

const authRouter = express.Router();

authRouter.post('/register', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.send(user.generateToken());
    })
    .catch(next);
});

authRouter.get('/signin', auth, (req, res, next) => {
  res.cookie('token', req.token);
  res.send(req.token);
});


export default authRouter;
