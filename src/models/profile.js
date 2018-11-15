'use strict';

import mongoose from 'mongoose';
import User from '../auth/user';
import StatBlock from '../models/statBlock';

const Schema = mongoose.Schema;

const profileSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  position: { type: String },
  bio: { type: String, default: `Hello!` },
  email: { type: String },
  role: { type: String },

});

profileSchema.pre('save', function (next) {
  let profile = this._id;
  let role = this.role;
  let user = this.user;
  let statBlock = new StatBlock({ user, profile });
  statBlock.save();

  User.findById(user)
    .then(user => {
      if (!user) {
        return Promise.reject('Sorry, unable to assign a profile to an invalid user');

      } else {

        if (role === 'coach') {

          User.findByIdAndUpdate(
            user,
            {
              coach: profile,
              role: 'coach',
            }
          )
            .then(Promise.resolve())
            .catch(err => Promise.reject(err));

        } else if (role === 'player') {

          User.findByIdAndUpdate(
            user,
            {
              player: profile,
              role: 'player',
            }
          )
            .then(Promise.resolve())
            .catch(err => Promise.reject(err));
        }
      }
    })
    .then(next())
    .catch(next);
});
export default mongoose.model('profiles', profileSchema);