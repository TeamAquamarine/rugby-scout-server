'use strict';

import express from 'express';
const uploadRouter = express.Router();

import multer from 'multer';
const upload = multer({ dest: `${__dirname}/../../tmp` });

import auth from '../auth/middleware';
import s3 from '../auth/lib/s3';
import Profile from '../models/profile';

uploadRouter.post('/upload', auth, upload.any(), (req, res, next) => {
  if (!req.files.length) {
    return next('Invalid File UPload');
  }

  let file = req.files[0];
  let key = `${file.filename}.${file.originalname}`;

  s3.upload(file.path, key)
    .then(url => {
      console.log('in s3.upload callback', url);
      Profile.findOneAndUpdate({_id: req.user.profile}, {imageSrc: url}, {new: true});
      res.status(200);
      res.send(url);
    })
    .catch(next);
});

export default uploadRouter;


