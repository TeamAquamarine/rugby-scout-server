'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from '../src/routes/api';
import authRouter from './auth/authRouter';
import modelFinder from './middleware/modelFinder';
import seeder from './seed';

let app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);
app.use(router);

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