'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from '../src/routes/api';
import authRouter from './auth/authRouter';
import modelFinder from './middleware/modelFinder';

let app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);
app.use(router);

let server = false;

app.start = (port) => {
  if (server) {
    console.log(`Server already running`);
  } else {
    server = app.listen(port, err => {
      if (err) { throw err; }
      console.log(`Server running on port ${port}`);
    });
  }
};

app.stop = () => {
  server.close(() => {
    console.log(`Server has been shut down`);
  });
};

module.exports = app;

// module.exports = {
//   start: (port) => {
//     if(!server) {
//       server = app.listen(port, (err) => {
//         if(err) {throw err;}
//         console.log('Server running on', port);
//       });
//     }else{
//       console.log('Server already running');
//     }
//   },
//   stop: () => {
//     server.close(() => {
//       console.log('Server has been stopped');
//     });
//   },
// };