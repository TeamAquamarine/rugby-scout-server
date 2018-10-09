'use strict';

import mongoose, { models, SchemaType } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const Schema = mongoose.Schema;

const userSchema = new Schema({
  //username is an email address
  username: { type: String, required: true },
  password: { type: String, required: true },
  coach: { type: Schema.Types.ObjectId, ref: 'profiles' },
  player: { type: Schema.Types.ObjectId, ref: 'profiles' },
  team: { type: Schema.Types.ObjectId, ref: 'teams' },
  stats: { type: Schema.Types.ObjectId, ref: 'stats' },
  role: { type: String, enum: ['coach', 'player'] },

});

userSchema.pre('save', function (next) {
  this.hashPassword(5, next);
});

userSchema.pre('findOne', function (next) {
  this.populate('stats', '-user -__v');
  this.populate('coach', '-user -__v -role');
  this.populate('player', '-user -__v -role');

  next();
});

//Does password comparison
userSchema.statics.authenticate = function (auth) {
  let userQuery = { username: auth.username };

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
userSchema.statics.createFromOAuth = function (githubUser) {
  if (!githubUser) {
    return Promise.reject('invalid github user');
  }

  return this.findOne({
    username: githubUser.login,

  }).then(user => {
    if (!user) throw new Error('user not found');
    return user;

  }).catch(err => {
    let username = githubUser.login;
    let password = 'none';//oauth passwords are set to none. Password required and oauth uses tokens

    return this.create({
      username: username,
      password: password,
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