'use strict';

const mongoose = require('mongoose');
require('dotenv').config();
require('babel-register');

//Startup mongo and server
mongoose.connect(process.env.MONGODB_URI);
require('./src/app').start(process.env.PORT);