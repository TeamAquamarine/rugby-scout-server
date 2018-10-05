'use strict';

import express from 'express';
import modelFinder from '../middleware/modelFinder';
const router = express.Router();

router.param('model', modelFinder);

router.post('/:model', (req, res, next) => {
  let document = new req.model(req.body);

  document.save()
    .then(data => {
      res.send(data);
    })
    .catch(next);
});

router.get('/hello', (req, res, next) => {
  res.send('hello world');
});

router.put('', () => {

});

router.delete('', () => {

});

export default router;