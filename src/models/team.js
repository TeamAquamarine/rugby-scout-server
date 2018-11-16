'use strict';


import mongoose from 'mongoose';
import Users from '../auth/user';

const Schema = mongoose.Schema;

const teamSchema = Schema({
  coach: { type: Schema.Types.ObjectId, ref: 'users' },
  players: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
});

teamSchema.pre('save', function (next) {
  Users.findByIdAndUpdate(this.coach, { team: this._id })
    .then(Promise.resolve(next()))
    .catch(err => Promise.reject(err));

});

teamSchema.pre('findOne', function (next) {
  this.populate('coach', '-username -password -team -__v');
  this.populate('players', '-username -password -team -__v');
  next();
});

export default mongoose.model('teams', teamSchema);

