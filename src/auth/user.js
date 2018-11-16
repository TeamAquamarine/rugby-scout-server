'use strict';

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Profile from '../models/profile';


const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: Schema.Types.ObjectId, ref: 'profiles' },
  team: { type: Schema.Types.ObjectId, ref: 'teams' },
  stats: { type: Schema.Types.ObjectId, ref: 'stats' },
  role: { type: String, enum: ['coach', 'player'], default: 'player' },

});

userSchema.pre('save', function (next) {
  this.hashPassword(5, next);
  let user = this;
  let profile = new Profile({ user: user._id });
  user.profile = profile._id;
  profile.save();

});

userSchema.pre('findOne', function (next) {
  this.populate('stats', '-user -__v');
  this.populate('coach', '-user -__v -role');
  this.populate('player', '-user -__v -role');

  next();
});

//Does password comparison
userSchema.statics.authenticate = function (auth) {
  let userQuery = { email: auth.email };

  return this.findOne(userQuery)
    .then(user => user && user.comparePassword(auth.password))
    .catch(console.error);
};

//checks the json web token decrypted with secret against id in db
userSchema.statics.authorize = function (token) {
  let parsedToken = jwt.verify(token, process.env.SECRET);
  let query = { _id: parsedToken.id };

  return this.findOne(query)
    .then(user => user)
    .catch(console.error);
};
//checks the database for the user and creates it if the user is not already in the database
userSchema.statics.createFromOAuth = function (googleUser) {
  if (!googleUser) {
    return Promise.reject('invalid google user');
  }

  return this.findOne({
    email: googleUser.email,

  }).then(user => {
    if (!user) throw new Error('user not found');
    return user;

  }).catch(err => {
    let email = googleUser.email;
    let password = 'none';//oauth passwords are set to none. Password required and oauth uses tokens

    return this.create({
      email,
      password,
    });
  });
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
    .then(valid => valid ? this : null);
};

export default mongoose.model('users', userSchema);