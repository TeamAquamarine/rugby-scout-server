'use strict';

import express from 'express';
import modelFinder from '../middleware/modelFinder';
import auth from '../auth/middleware';
import Team from '../models/team';
import User from '../auth/user';
const router = express.Router();

router.param('model', modelFinder);

/***********************************
*     POST REQUESTS                *
************************************/
router.post('/team', auth, (req, res, next) => {

  if (req.user.role === 'coach') {
    req.body.coach = req.user._id;
  } else { throw new Error('only coaches may create teams'); }

  let document = new Team(req.body);

  document.save()
    .then(data => {
      res.send(data);
    })
    .catch(next);

});

router.post('/:model', auth, (req, res, next) => {

  req.body.user = req.user._id;

  let document = new req.model(req.body);

  document.save()
    .then(data => {
      res.send(data);
    })
    .catch(next);
});

/***********************************
*     GET REQUESTS                 *
************************************/
router.get('/hello', (req, res, next) => {
  res.send('hello world');
});

router.get('/user/:id', (req, res, next) => {
  return User.findOne({ _id: req.params.id })
    .select('-username -password -__v')
    .then(data => {
      res.send(data);
    })
    .catch(next);
});

router.get('/:model/:id', (req, res, next) => {
  return req.model.findOne({ _id: req.params.id })
    .then(data => {
      res.send(data);
    })
    .catch(next);
});


/***********************************
*     PUT REQUESTS                 *
************************************/
router.put('/:model/', auth, (req, res, next) => {

  return req.model.findOneAndUpdate(req.user._id, req.body, { new: true })
    .then(data => {
      res.send(data);
    })
    .catch(next);
});

/***********************************
*     DELETE REQUESTS              *
************************************/
router.delete('/:model/:id', (req, res, next) => {
  return req.model.findByIdAndDelete({ _id: req.params.id })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(next);
});

export default router;