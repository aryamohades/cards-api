const {
  list,
  create,
  destroy
} = require('../../controllers').authWants;

const { requireAuth } = require('../../middleware');

module.exports = (router) => {
  router.get('/api/me/wants', requireAuth, list);
  router.post('/api/me/wants', requireAuth, create);
  router.delete('/api/me/wants/:id', requireAuth, destroy);
};
