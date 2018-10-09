'use strict';

import express from 'express';
import modelFinder from '../middleware/modelFinder';
import auth from '../auth/middleware';
import team from '../models/team';
const router = express.Router();

router.param('model', modelFinder);

/***********************************
*     POST REQUESTS                *
************************************/
router.post('/team', auth, (req, res, next) => {

  if (req.user.role === 'coach') {
    req.body.coach = req.user._id;
  } else { throw new Error('only coaches may create teams'); }

  let document = new team(req.body);

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
router.put('/team/roster/add/:id', auth, (req, res, next) => {
  if (req.user.role !== 'coach') { throw new Error('only coaches may create teams'); }
  let playerId = req.params.id;

  return team.findByIdAndUpdate(req.user.team, { $addToSet: { players: [playerId] } })
    .then(() => {
      res.status(200);
      res.send('player added');
    })
    .catch(next);

});

router.put('/team/roster/remove/:id', auth, (req, res, next) => {
  if (req.user.role !== 'coach') { throw new Error('only coaches may create teams'); }
  let playerId = req.params.id;

  return team.update({_id: req.user.team}, { $pull: { players: playerId} })
    .then(() => {
      res.status(200);
      res.send('player deleted');
    })
    .catch(next);

});

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