const { User } = require('../../models');
const { find } = require('../../middleware');

const read = find({
  model: User,
  method: 'findOne',
  where: (req) => ({
    username: req.params.username
  }),
  attributes: [
    'username',
    'notes',
    'createdAt'
  ]
});

module.exports = {
  read
};
