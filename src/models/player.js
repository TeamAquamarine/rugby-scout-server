'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const playerSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: { type: String, default: `Hello!` },
  email: { type: String},

});

export default mongoose.model('players', playerSchema);