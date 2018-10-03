const {
  list,
  read
} = require('../../controllers').collection;

module.exports = (router) => {
  router.get('/api/user/:username/collection', list);
  router.get('/api/user/:username/collection/:id', read);
};
