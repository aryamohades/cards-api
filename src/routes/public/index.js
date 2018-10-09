const user = require('./user');
const login = require('./login');
const register = require('./register');
const forgotPassword = require('./forgot-password');
const resetPassword = require('./reset-password');
const confirmEmail = require('./confirm-email');
const wants = require('./wants');
const cardSet = require('./card-set');
const card = require('./card');
const collection = require('./collection');

module.exports = {
  user,
  login,
  register,
  forgotPassword,
  resetPassword,
  confirmEmail,
  cardSet,
  card,
  collection,
  wants
};
