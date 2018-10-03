const Sequelize = require('sequelize');

const { Op } = Sequelize;

const {
  Card,
  CardSet,
  Rarity,
  CollectionEntry,
  WishlistEntry
} = require('../../models');

const { find } = require('../../middleware');

const list = find({
  model: Card,
  method: 'findAndCountAll',
  attributes: {
    exclude: [
      'createdAt'
    ]
  },
  where: (req) => {
    const {
      keyword,
      collection,
      wishlist
    } = req.query;

    const { user } = req;

    const keywordWhere = {
      name: {
        [Op.iLike]: `%${keyword}%`
      }
    };

    const collectionWhere = user
      ? { '$collectionEntries.user_id$': user.id }
      : {};

    const wishlistWhere = user
      ? { '$wishlistEntries.user_id$': user.id }
      : {};

    if (user && collection && wishlist && keyword) {
      return Sequelize.and(
        keywordWhere,
        Sequelize.or(
          collectionWhere,
          wishlistWhere
        )
      );
    } else if (user && collection && wishlist) {
      return Sequelize.or(
        collectionWhere,
        wishlistWhere
      );
    } else if (keyword) {
      return keywordWhere;
    }

    return {};
  },
  order: (req) => {
    const { sort } = req.query;

    if (sort === 'number') {
      return [
        ['number', 'ASC'],
        [CardSet, 'sequence', 'ASC']
      ];
    } else if (sort === 'name') {
      return [
        ['name', 'ASC']
      ];
    } else if (sort === 'rarity') {
      return [
        [Rarity, 'value', 'DESC'],
        [CardSet, 'sequence', 'ASC'],
        ['number', 'ASC']
      ];
    } else if (sort === 'release') {
      return [
        [CardSet, 'sequence', 'ASC'],
        ['number', 'ASC']
      ];
    }
  },
  include: (req) => {
    const {
      set,
      sets,
      rarity,
      collection,
      wishlist
    } = req.query;

    const { user } = req;

    const include = [];

    const rarityInclude = {
      model: Rarity,
      as: 'rarity',
      attributes: ['type', 'value']
    };

    const setInclude = {
      model: CardSet,
      as: 'series',
      attributes: ['name', 'search']
    };

    if (set) {
      setInclude.where = {
        search: set
      };
    }

    if (sets) {
      setInclude.where = {
        search: {
          [Op.in]: sets.split(',')
        }
      };
    }

    if (rarity) {
      rarityInclude.where = {
        type: rarity.split(',')
      };
    }

    include.push(rarityInclude);
    include.push(setInclude);

    if (user) {
      const collectionInclude = {
        model: CollectionEntry,
        as: 'collectionEntries',
        attributes: ['user_id'],
        duplicating: false
      };

      const wishlistInclude = {
        model: WishlistEntry,
        as: 'wishlistEntries',
        attributes: ['user_id'],
        duplicating: false
      };

      if (collection && wishlist) {
        include.push(collectionInclude);
        include.push(wishlistInclude);
      } else if (collection) {
        collectionInclude.where = {
          user_id: user.id
        };

        include.push(collectionInclude);
      } else if (wishlist) {
        wishlistInclude.where = {
          user_id: user.id
        };

        include.push(wishlistInclude);
      }
    }

    return include;
  },
  serialize: (data, { total, pages }) => ({
    items: data,
    total,
    pages
  })
});

const read = find({
  model: Card,
  method: 'findOne',
  where: (req) => ({
    id: req.params.id
  }),
  attributes: {
    exclude: [
      'series_id',
      'rarity_id',
      'createdAt'
    ]
  },
  include: [
    {
      model: Rarity,
      as: 'rarity',
      attributes: ['type']
    },
    {
      model: CardSet,
      as: 'series',
      attributes: ['name']
    }
  ]
});

module.exports = {
  list,
  read
};

