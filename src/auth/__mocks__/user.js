'use strict';

export default {

  authenticate: (auth) => {
    if((!!auth.username && !!auth.password)){
      return Promise.resolve({generateToken: () => 'tokenReturned'});
    } else {
      Promise.reject('Error invalid username or password');
    }
  },

  authorize: (auth) => {

  },

};