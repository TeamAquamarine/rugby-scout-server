'use strict';

import User from './model';
import express from 'express';

const authRouter = express.Router();

authRouter.post('/register', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then(user => res.send(user.generateToken()))
    .catch(next);
});

export default authRouter;
