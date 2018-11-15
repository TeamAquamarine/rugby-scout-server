'use strict';

import mongoose from 'mongoose';
import User from '../auth/user';
import StatBlock from '../models/statBlock';

const Schema = mongoose.Schema;

const profileSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  firstName: { type: String },
  lastName: { type: String },
  position: { type: String, default: 'N/A' },
  bio: { type: String, default: `Hello!` },
  email: { type: String, default: '' },
  role: { type: String, default: 'player' },
  imageSrc: { type: String, default: 'https://s3.amazonaws.com/rugbyscout-two/defaultimage.png' },

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
        User.findByIdAndUpdate(
          user,
          {
            profile,
            role,
          }
        )
          .then(Promise.resolve())
          .catch(err => Promise.reject(err));
      }
    })
    .then(next())
    .catch(next);
});

export default mongoose.model('profiles', profileSchema);