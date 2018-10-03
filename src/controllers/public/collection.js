const {
  CollectionEntry,
  Card,
  CardSet,
  User
} = require('../../models');

const { find } = require('../../middleware');

const findUserByUsername = find({
  model: User,
  method: 'findOne',
  where: (req) => ({
    username: req.params.username
  }),
  updateRequest: (req, data) => {
    req.user = data;
  },
  end: false
});

const list = [
  findUserByUsername,
  find({
    model: CollectionEntry,
    method: 'findAndCountAll',
    where: (req) => ({
      user_id: req.user.id
    }),
    attributes: {
      exclude: [
        'user_id',
        'card_id'
      ]
    },
    include: [
      {
        model: Card,
        as: 'card',
        attributes: [
          'name',
          'number',
          'image'
        ],
        include: {
          model: CardSet,
          as: 'series',
          attributes: ['name']
        }
      }
    ],
    serialize: (data, { total, pages }) => ({
      items: data,
      total,
      pages
    })
  })
];

const read = [
  findUserByUsername,
  find({
    model: CollectionEntry,
    method: 'findOne',
    where: (req) => ({
      id: req.params.id,
      user_id: req.user.id
    }),
    attributes: {
      exclude: [
        'user_id',
        'card_id'
      ]
    },
    include: [
      {
        model: Card,
        as: 'card',
        attributes: [
          'name',
          'number',
          'image'
        ],
        include: {
          model: CardSet,
          as: 'series',
          attributes: ['name']
        }
      }
    ]
  })
];

module.exports = {
  list,
  read
};
