const {
  list,
  create,
  read,
  update,
  destroy
} = require('../../controllers').authCollection;

const { requireAuth } = require('../../middleware');

module.exports = (router) => {
  router.get('/api/me/collection', requireAuth, list);
  router.post('/api/me/collection', requireAuth, create);
  router.get('/api/me/collection/:id', requireAuth, read);
  router.post('/api/me/collection/:id', requireAuth, update);
  router.delete('/api/me/collection/:id', requireAuth, destroy);
};
