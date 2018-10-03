const {
  getMessages,
  sendMessage
} = require('../../controllers').authMessage;

const { requireAuth } = require('../../middleware');

module.exports = (router) => {
  router.get('/api/me/messages', requireAuth, getMessages);
  router.post('/api/me/messages', requireAuth, sendMessage);
};
