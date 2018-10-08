'use strict';

import mongoose from 'mongoose';
// import Team from '../models/team';
const Schema = mongoose.Schema;

const coachSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: { type: String, default: `Hello!` },
  email: { type: String, default: 'Not provided' },
  phone: { type: String, default: '123.456.7890' }, 
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true }, 
});

export default mongoose.model('coaches', coachSchema);