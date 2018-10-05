'use strict';

import User from './model';
import express from 'express';

const Authrouter = express.Router();

Authrouter.post('/register', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then(user => res.send(user.generateToken()))
    .catch(next);
});

export default Authrouter;