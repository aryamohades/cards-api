const {
  CollectionEntry,
  Card,
  CardSet,
  Rarity
} = require('../../models');

const {
  find,
  insert,
  edit,
  remove
} = require('../../middleware');

const list = find({
  model: CollectionEntry,
  method: 'findAndCountAll',
  where: (req) => ({
    user_id: req.user.id
  }),
  attributes: {
    exclude: [
      'card_id',
      'user_id'
    ]
  },
  include: [{
    model: Card,
    as: 'card',
    attributes: [
      'name',
      'number',
      'image'
    ],
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
    ]
  }],
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
    updateRequest: (req, data) => {
      req.card = data;
    },
    where: (req) => ({
      id: req.body.cardId
    }),
    end: false
  }),
  insert({
    model: CollectionEntry,
    data: (req) => ({
      psa: req.body.psa,
      bgs: req.body.bgs,
      notes: req.body.notes,
      condition: req.body.condition
    }),
    associate: (req, entry) => ([
      entry.setCard(req.card),
      entry.setUser(req.user)
    ])
  })
];

const read = find({
  model: CollectionEntry,
  method: 'findOne',
  where: (req) => ({
    id: req.params.id,
    user_id: req.user.id
  }),
  attributes: {
    exclude: [
      'card_id',
      'user_id'
    ]
  },
  include: [{
    model: Card,
    as: 'card',
    attributes: {
      exclude: [
        'createdAt',
        'series_id'
      ]
    },
    include: {
      model: CardSet,
      as: 'series',
      attributes: ['name']
    }
  }]
});

const update = edit({
  model: CollectionEntry,
  where: (req) => ({
    id: req.params.id
  }),
  data: (req) => ({
    psa: req.body.psa,
    bgs: req.body.bgs,
    notes: req.body.notes,
    condition: req.body.condition
  }),
  beforeUpdate: (data) => {
    if (data.psa !== null && data.psa !== undefined) {
      if (data.bgs === undefined) {
        data.bgs = null;
      }
    } else if (data.bgs !== null && data.bgs !== undefined) {
      if (data.psa === undefined) {
        data.psa = null;
      }
    }
  }
});

const destroy = remove({
  model: CollectionEntry,
  where: (req) => ({
    id: req.params.id,
    user_id: req.user.id
  })
});

module.exports = {
  list,
  create,
  read,
  update,
  destroy
};
