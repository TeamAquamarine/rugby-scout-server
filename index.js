'use strict';
require('dotenv').config();
require('babel-register');
const mongoose = require('mongoose');
const seeder = require('./src/seed');

mongoose.connect(process.env.MONGODB_URI);
seeder.seedMongo(20);

require('./src/app').start(process.env.PORT);
