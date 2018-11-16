import faker from 'faker';
import User from './auth/user';
import Profile from './models/profile';

const seeder = {};

seeder.seedUsers = function (count) {
  let i = 0;
  let userIds = [];

  while (i < count) {
    let dummy = {
      email: faker.internet.email(),
      password: 'password',
    };

    let user = new User(dummy);
    userIds.push(user._id);

    user.save();
    i++;
  }

  return userIds;
};

seeder.seedProfiles = function (userIds) {
  userIds.forEach(user => {
    let dummy = {
      user,
      role: 'player',
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };

    let profile = new Profile(dummy);

    profile.save();
  });
};

seeder.seedMongo = function (count) {
  const users = this.seedUsers(count);
  // this.seedProfiles(users);
};

module.exports = seeder;