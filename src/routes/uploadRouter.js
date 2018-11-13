'use strict';

import express from 'express';
const uploadRouter = express.Router();

import multer from 'multer';
const upload = multer({ dest: `${__dirname}/../../tmp` });


import auth from '../auth/middleware';
import s3 from '../auth/lib/s3';

uploadRouter.post('/upload', auth, upload.any(), (req, res, next) => {
  if (!req.files.length) {
    return next('Invalid File UPload');
  }

  let file = req.files[0];
  let key = `${file.filename}.${file.originalname}`;

  s3.upload(file.path, key)
    .then(url => {
      console.log('in s3.upload callback', url);
      res.status(200);
      res.send({ url: url });
    })
    .catch(next);
});

export default uploadRouter;


