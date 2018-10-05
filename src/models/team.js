'use strict';


import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teamSchema = Schema({
  name: { type: String, required: true },
  city: { type: String },
  state: { type: String},
  phone: { type: String },
  size: {type: Number, min: 0, default: 0},
});

export default mongoose.model('teams', teamSchema);