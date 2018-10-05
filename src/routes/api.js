'use strict';

import express from 'express';
import modelFinder from '../middleware/modelFinder';
const router = express.Router();

router.param('model', modelFinder);

router.post('/:model', (req, res, next) => {
  let document = new req.model(req.body);
  // console.log(document);

  document.save()
    .then(data => {
      // console.log(data);
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

router.put('', () => {

});

router.delete('', () => {

});

export default router;