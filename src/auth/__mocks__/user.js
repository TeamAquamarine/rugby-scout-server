'use strict';

export default {

  authenticate: (auth) => {
    if ((!!auth.username && !!auth.password)) {
      console.log('getting mocked');
      return Promise.resolve({ generateToken: () => 'tokenReturned' });
    } else {
      console.log('getting mocked error');

      return Promise.reject('Error invalid username or password');
    }
  },

  authorize: (token) => {
    if (token){
      let user = {};
      console.log('getting token authorized');
      return Promise.resolve(user);
    } else {
      console.log('getting mocked token error');
      return Promise.reject('Error invalid authorization');
    }
  },

};