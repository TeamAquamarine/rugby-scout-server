'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from '../src/routes/api';
import authRouter from './auth/authRouter';
import uploadRouter from './routes/uploadRouter';
import modelFinder from './middleware/modelFinder';
import seeder from './seed';

let app = express();
let corsOptions = {
  origin: ['http://localhost:8080', 'https://happy-franklin-03cd80.netlify.com', 'https://git.heroku.com/rugby-scout.git'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);
app.use(router);
app.use(uploadRouter);


let isRunning = false;

app.start = (port) => {
  if (isRunning) {
    console.log(`Server already running`);

  } else {
    app.listen(port, err => {
      if (err) { throw err; }
      isRunning = true;
      // seeder.seedMongo(20);
      console.log(`Server running on port ${port}`);
    });
  }
};

app.stop = () => {
  app.close(() => {
    console.log(`Server has been shut down`);
    isRunning = false;
  });
};

module.exports = app;