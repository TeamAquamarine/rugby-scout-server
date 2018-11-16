'use strict';

import express from 'express';
import modelFinder from '../middleware/modelFinder';
import auth from '../auth/middleware';
import Profile from '../models/profile';
import Team from '../models/team';
import User from '../auth/user';
import StatBlock from '../models/statBlock';
const router = express.Router();

router.param('model', modelFinder);

const baseURL = '/api/v1';

/***********************************
*     POST REQUESTS                *
************************************/
router.post(`${baseURL}/team`, auth, (req, res, next) => {

  if (req.user.role === 'coach') {
    req.body.coach = req.user._id;

    let document = new Team(req.body);

    document.save()
      .then(data => {
        res.send(data);
      })
      .catch(next);

  } else {
    res.status(401);
    res.send('only coaches may create teams');
  }

});

router.post(`${baseURL}/:model`, auth, (req, res, next) => {

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
router.get(`${baseURL}/hello`, auth, (req, res, next) => {
  console.log('IN BAD ROUTE');

  res.send('hello world');
});

router.get(`${baseURL}/myprofile`, auth, (req, res, next) => {
  let data = {};
  return Profile.findOne({ user: req.user._id })
    .then(profile => {
      data.profile = profile;

      return StatBlock.findOne({ user: req.user._id })
        .select('-user -profile -_id -__v')
        .then(stats => {
          data.stats = stats;
          res.send(data);
        });

    })
    .catch(next);
});

router.get(`${baseURL}/:model/topten/:field`, (req, res, next) => {
  const { field } = req.params;

  return req.model.find()
    .sort({ [field]: -1 })
    .limit(10)
    .populate('profile')
    .select(`profile ${field}`)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(next);
});

router.get(`${baseURL}/user/:id`, (req, res, next) => {
  return User.findOne({ _id: req.params.id })
    .select('-username -password -__v')
    .then(data => {
      res.send(data);
    })
    .catch(next);
});

router.get(`${baseURL}/:model/all/:role`, (req, res, next) => {
  return req.model.find()
    .where({ role: req.params.role })
    .then(data => {
      res.send(data);
    })
    .catch(next);
});

router.get(`${baseURL}/profile/:id`, (req, res, next) => {
  let data = {};
  return Profile.findOne({ _id: req.params.id })
    .then(userProfile => {
      data.profile = userProfile;

      return StatBlock.find()
        .where({ profile: req.params.id })
        .select('-_id -user -profile -__v')
        .then(stats => {
          data.stats = stats;
          res.send(data);
        });
    })
    .catch(next);
});

router.get(`${baseURL}/:model/:id`, (req, res, next) => {
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
  if (req.user.role !== 'coach') {
    res.status(401);
    res.send('only coaches may add to team roster');
  } else {
    let playerId = req.params.id;

    return Team.findByIdAndUpdate(req.user.team, { $addToSet: { players: [playerId] } })
      .then(() => {
        res.status(200);
        res.send('player added');
      })
      .catch(next);
  }
});

router.put('/team/roster/remove/:id', auth, (req, res, next) => {
  if (req.user.role !== 'coach') {
    res.status(401);
    res.send('only coaches may delete from team roster');
  } else {
    let playerId = req.params.id;

    return Team.update({ _id: req.user.team }, { $pull: { players: playerId } })
      .then(() => {
        res.status(200);
        res.send('player deleted');
      })
      .catch(next);
  }

});

router.put(`${baseURL}/:model`, auth, (req, res, next) => {
  const field = req.params.model === 'statBlock' ? 'stats' : req.params.model;

  return req.model.findOneAndUpdate({ user: req.user._id }, req.body, { new: true })
    .then(data => {
      if (data.role) {
        User.findByIdAndUpdate(data.user, { role: data.role }, { new: true })
          .then(next())
          .catch(next);
      }
      res.send(data);
    })
    .catch(next);

});

/***********************************
*     DELETE REQUESTS              *
************************************/
router.delete(`${baseURL}/:model/:id`, (req, res, next) => {
  return req.model.findByIdAndDelete({ _id: req.params.id })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(next);
});

export default router;