'use strict';

import express from 'express';
const router = express.Router();

router.post('', () => {

});

router.get('/hello', (req, res, next) => {
  res.send('hello world');
});

router.put('', () => {

});

router.delete('', () => {

});

export default router;