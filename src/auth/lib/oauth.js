'use strict';

import superagent from 'superagent';
import User from '../model.js';

const authorize = req => {
  let code = req.query.code;
  console.log(code);

  return superagent.post('https://github.come/login/oauth/access_token')
    .type('form')
    .send({
      code: code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,

    }).then(res => {
      let githubToken = res.body.access_token;
      console.log(githubToken);
      return githubToken;

    }).then(githubToken => {
      return superagent.get('https://api.github.com/user')
        .set('Authorization', `Bearer ${githubToken}`)
        .then(response => {
          let user = response.body;
          console.log(user);
          return user;
        });

    }).then(githubUser => {
      return User.createFromOauth(githubUser);

    }).then(user => {
      return user.generateToken();
      
    }).catch(error => console('error authorizing user'));
};

export default authorize;