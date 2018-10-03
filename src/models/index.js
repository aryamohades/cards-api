const Sequelize = require('sequelize');
const fixtures = require('sequelize-fixtures');

const dbConnectionUrl = process.env.DATABASE_URL;

let sequelize;

if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize(dbConnectionUrl, {
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false
  });
} else {
  sequelize = new Sequelize(dbConnectionUrl, {
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false
  });
}

// Initialize models
const User = require('./user')(sequelize);
const CardSet = require('./card-set')(sequelize);
const Card = require('./card')(sequelize);
const CollectionEntry = require('./collection-entry')(sequelize);
const WishlistEntry = require('./wishlist-entry')(sequelize);
const Message = require('./message')(sequelize);
const Rarity = require('./rarity')(sequelize);

CardSet.hasMany(Card, {
  as: 'cards'
});

Card.belongsTo(CardSet, {
  as: 'series'
});

Card.hasMany(CollectionEntry, {
  as: 'collectionEntries'
});

Card.hasMany(WishlistEntry, {
  as: 'wishlistEntries'
});

CardSet.belongsToMany(Rarity, {
  through: 'set_rarity_map',
  timestamps: false
});

Rarity.belongsToMany(CardSet, {
  through: 'set_rarity_map',
  timestamps: false
});

Card.belongsTo(Rarity, {
  as: 'rarity'
});

CollectionEntry.belongsTo(Card, {
  as: 'card'
});

WishlistEntry.belongsTo(Card, {
  as: 'card'
});

CollectionEntry.belongsTo(User, {
  as: 'user'
});

WishlistEntry.belongsTo(User, {
  as: 'user'
});

User.hasMany(CollectionEntry, {
  as: 'collection'
});

User.hasMany(WishlistEntry, {
  as: 'wishlist'
});

User.belongsToMany(Card, {
  as: 'wants',
  through: 'user_wants_map',
  timestamps: false
});

Message.belongsTo(CollectionEntry, {
  as: 'collectionEntry'
});

Message.belongsTo(User, {
  as: 'sender'
});

Message.belongsTo(User, {
  as: 'receiver'
});

Message.hasMany(Message, {
  as: 'replies'
});

module.exports = {
  fixtures,
  sequelize,
  Sequelize,
  User,
  CardSet,
  Card,
  Rarity,
  CollectionEntry,
  WishlistEntry,
  Message
};
