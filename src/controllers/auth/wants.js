const {
  Card,
  CardSet,
  Rarity
} = require('../../models');

const {
  find,
  insert,
  remove
} = require('../../middleware');

const list = find({
  source: 'user',
  method: 'getWants',
  manualCount: 'countWants',
  attributes: {
    exclude: ['series_id']
  },
  include: [
    {
      model: CardSet,
      as: 'series',
      attributes: ['name']
    },
    {
      model: Rarity,
      as: 'rarity',
      attributes: ['type']
    }
  ],
  serialize: (data, { total, pages }) => ({
    items: data,
    total,
    pages
  })
});

const create = [
  find({
    model: Card,
    method: 'findOne',
    name: 'card',
    where: (req) => ({
      id: req.body.cardId
    }),
    end: false
  }),
  insert({
    source: 'user',
    method: 'addWant',
    data: (req) => req.body.cardId
  })
];

const destroy = remove({
  source: 'user',
  method: 'removeWant',
  data: (req) => req.params.id
});

module.exports = {
  list,
  create,
  destroy
};
