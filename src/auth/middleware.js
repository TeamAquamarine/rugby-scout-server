'use strict';

import User from './model';

export default (req, res, next) => {
  
  let authenticate = (auth) =>{
    User.authenticate(auth)
      .then(user => {
        if(!user) {
          throw console.error('user could not be authenticated');
        } else {
          req.token = user.generateToken();
          next();
        }
      })
      .catch(next);
  };
  
  let auth = {};
  let authHeader = (req.headers.authorization);

  if (!authHeader) {console.error('user is not authorized');}

  //basic authentication parsing 
  if (authHeader.match(/basic/i)) {
    let base64Header = authHeader.replace(/Basic\s+/i, '');
    let base64Buffer = Buffer.from(base64Header, 'base64');
    let bufferString = base64Buffer.toString();
    let [username, password] = bufferString.split(':');
    auth = { username, password };
    authenticate(auth);
  }
};