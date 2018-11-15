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
      Profile.findOneAndUpdate({ user: req.user._id }, { imageSrc: url }, { new: true })
        .then(data => {
          res.status(200);
          res.send(data.imageSrc);
        });
    })
    .catch(next);
});

export default uploadRouter;


