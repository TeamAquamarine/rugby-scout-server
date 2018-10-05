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

//Does password comparison
userSchema.statics.authenticate = function (auth) {
  let userQuery = { username: auth.username};

  return this.findOne(userQuery)
    .then(user => user && user.comparePassword(auth.password))
    .catch(console.error);
};

//Creates a more secure hashed password before saving
userSchema.methods.hashPassword = function (salt, next) {
  bcrypt.hash(this.password, salt)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(error => { throw error; });
};

//generates a token from secret and userid
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET);
};

//uses bcrypt decryption to compare passwords
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid? this : null);
};

export default mongoose.model('users', userSchema);
