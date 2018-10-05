'use strict';

import mongoose from 'mongoose';
// import Team from '../models/team';
const Schema = mongoose.Schema;

const coachSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: { type: String, default: `Hello!` },
  wins: { type: Number, min: 0, default: 0 },
  losses: { type: Number, min: 0, default: 0 },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
});

export default mongoose.model('coaches', coachSchema);