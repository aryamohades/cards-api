const {
  CardSet,
  Card,
  Rarity
} = require('../../models');

const { find } = require('../../middleware');

const list = find({
  model: CardSet,
  attributes: [
    'name',
    'size',
    'release',
    'image',
    'search',
    'symbol',
    'firstEdition'
  ]
});

const read = find({
  model: CardSet,
  method: 'findOne',
  where: (req) => ({
    search: req.params.name
  }),
  attributes: {
    exclude: ['createdAt']
  },
  order: () => ([
    [
      {
        model: Rarity,
        as: 'rarities'
      },
      'value',
      'ASC'
    ],
    [
      {
        model: Card,
        as: 'cards'
      },
      'number',
      'ASC'
    ]
  ]),
  include: [
    {
      model: Card,
      as: 'cards',
      attributes: [
        'id',
        'name',
        'number',
        'numberText',
        'image'
      ],
      include: [
        {
          model: CardSet,
          as: 'series',
          attributes: ['name', 'search']
        },
        {
          model: Rarity,
          as: 'rarity',
          attributes: ['type']
        }
      ]
    },
    {
      model: Rarity,
      attributes: ['type'],
      through: { attributes: [] }
    }
  ]
});

module.exports = {
  list,
  read
};
