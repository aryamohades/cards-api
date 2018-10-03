const authCollection = require('./collection');
const authUser = require('./user');
const authWants = require('./wants');
const authMessage = require('./message');
const changePassword = require('./change-password');
const changeEmail = require('./change-email');

module.exports = {
  authCollection,
  authUser,
  authWants,
  authMessage,
  changePassword,
  changeEmail
};
