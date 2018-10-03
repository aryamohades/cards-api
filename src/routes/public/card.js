const {
  list,
  read
} = require('../../controllers').card;

const { optionalAuth } = require('../../middleware');

module.exports = (router) => {
  router.get('/api/cards', optionalAuth, list);
  router.get('/api/cards/:id', optionalAuth, read);
};
