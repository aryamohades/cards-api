const crypto = require('crypto');

const {
  User,
  CardSet
} = require('../../models');

const { find } = require('../../middleware');

const list = [
  find({
    model: User,
    method: 'findOne',
    where: (req) => ({
      username: req.params.username
    }),
    updateRequest: (req, data) => {
      req.user = data;
    },
    end: false
  }),
  find({
    source: 'user',
    method: 'getWants',
    manualCount: 'countWants',
    attributes: {
      exclude: [
        'createdAt',
        'series_id'
      ]
    },
    include: [{
      model: CardSet,
      as: 'series',
      attributes: ['name']
    }],
    serialize: (data, { total, pages }) => ({
      items: data.map((item) => ({
        id: item.id,
        name: item.name,
        number: item.number,
        image: item.image,
        series: item.series
      })),
      total,
      pages
    })
  })
];

module.exports = {
  list
};
