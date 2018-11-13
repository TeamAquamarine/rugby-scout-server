'use strict';

import mongoose from 'mongoose';
import Users from '../auth/user';

const Schema = mongoose.Schema;

const statBlockSchema = new Schema({

  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  profile: { type: Schema.Types.ObjectId, ref: 'profiles', required: true },
  wins: { type: Number, min: 0, default: 0 },
  losses: { type: Number, min: 0, default: 0 },
  tries: { type: Number, min: 0, default: 0 },
  conversions: { type: Number, min: 0, default: 0 },
  penaltyGoals: { type: Number, min: 0, default: 0 },
  dropGoals: { type: Number, min: 0, default: 0 },
  tackles: { type: Number, min: 0, default: 0 },
  offloads: { type: Number, min: 0, default: 0 },
  handlingErrors: { type: Number, min: 0, default: 0 },
  runMeters: { type: Number, min: 0, default: 0 },
  linebreaks: { type: Number, min: 0, default: 0 },
  penaltiesConceded: { type: Number, min: 0, default: 0 },
  yellowCards: { type: Number, min: 0, default: 0 },
  redCards: { type: Number, min: 0, default: 0 },

});

statBlockSchema.pre('save', function (next) {
  Users.findByIdAndUpdate(this.user, { stats: this._id })
    .then(Promise.resolve(next()))
    .catch(err => Promise.reject(err));
});

export default mongoose.model('stats', statBlockSchema);