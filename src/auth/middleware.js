'use strict';

import User from './user';

export default (req, res, next) => {

  let authenticate = (auth) => {
    User.authenticate(auth)
      .then(user => {
        if (!user) {
          throw new Error('user could not be authenticated');
        } else {
          req.token = user.generateToken();
          next();
        }
      })
      .catch(next);
  };

  let authorize = (token) => {
    User.authorize(token)
      .then(user => {
        if (!user) {
          throw new Error('could not get user');
        } else {
          req.user = user;
          next();
        }
      })
      .catch(next);
  };

  let auth = {};
  let authHeader = (req.headers.authorization);

  if (!authHeader) {
    throw new Error('No header present');
  }

  //basic authentication parsing 
  if (authHeader.match(/basic/i)) {
    let base64Header = authHeader.replace(/Basic\s+/i, '');
    let base64Buffer = Buffer.from(base64Header, 'base64');
    let bufferString = base64Buffer.toString();
    let [email, password] = bufferString.split(':');
    auth = { email, password };
    authenticate(auth);
  } else if (authHeader.match(/bearer/i)) {
    let token = authHeader.replace(/bearer\s+/i, '');
    authorize(token);
  } else {
    throw new Error('Unknown header');
  }
};