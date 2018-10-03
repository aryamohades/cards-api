const Sequelize = require('sequelize');

const DataTypes = Sequelize.DataTypes;

module.exports = (sequelize) => {
  const Card = sequelize.define('card', {
    name: {
      field: 'name',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    cardId: {
      field: 'card_id',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    numberText: {
      field: 'number_text',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    number: {
      field: 'number',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      field: 'image',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    underscored: true
  });

  Card.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());

    delete values.collectionEntries;
    delete values.series_id;
    delete values.rarity_id;

    return values;
  };

  return Card;
};
