'use strict';

export default {

  authenticate: (auth) => {
    if ((!!auth.username && !!auth.password)) {
      return Promise.resolve({ generateToken: () => 'tokenReturned' });

    } else {
      return Promise.reject('Error invalid username or password');
    }
  },

  authorize: (token) => {
    if (token) {
      let user = {};
      return Promise.resolve(user);

    } else {
      return Promise.reject('Error invalid authorization');
    }
  },

};