'use strict';

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre('save', function (next) {
  this.hashPassword(5, next);
});

userSchema.methods.hashPassword = function (salt, next) {
  bcrypt.hash(this.password, salt)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(error => { throw error; });
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET);
};

export default mongoose.model('users', userSchema);