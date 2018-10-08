'use strict';


import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teamSchema = Schema({
  coach: { type: Schema.Types.ObjectId, ref: 'users'},
  players: [{ type: Schema.Types.ObjectId, ref: 'users'}],
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true},
  phone: { type: String },
  email: {type: String},
});

export default mongoose.model('teams', teamSchema);