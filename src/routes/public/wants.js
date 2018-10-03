const { list } = require('../../controllers').wants;

module.exports = (router) => {
  router.get('/api/user/:username/wants', list);
};
