'use strict';


import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teamSchema = Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true},
  phone: { type: String },
  email: {type: String, required: true},
  size: {type: Number, min: 0, default: 0},
});

export default mongoose.model('teams', teamSchema);