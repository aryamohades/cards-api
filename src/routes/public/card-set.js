const {
  list,
  read
} = require('../../controllers').cardSet;

module.exports = (router) => {
  router.get('/api/sets', list);
  router.get('/api/sets/:name', read);
};
