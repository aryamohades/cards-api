const login = require('./login');
const register = require('./register');
const card = require('./card');
const cardSet = require('./card-set');
const collection = require('./collection');
const user = require('./user');
const wants = require('./wants');
const resetPassword = require('./reset-password');

module.exports = {
  login,
  register,
  card,
  cardSet,
  collection,
  user,
  wants,
  resetPassword
};
