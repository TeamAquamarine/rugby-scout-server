'use strict';


import mongoose from 'mongoose';
import Users from '../auth/user';

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

teamSchema.pre('save', function (req, next) {

  Users.findById(req.body.user)
    .then(user => {
      if (!user) {
        return Promise.reject('user not found');
      }
      else if (user.role === 'coach'){
        return Promise.resolve(this.coach = req.body.user);
      } else {
        return Promise.resolve(this.players.push(req.body.user));
      }
    })
    .then(next())
    .catch(next);
});

export default mongoose.model('teams', teamSchema);

