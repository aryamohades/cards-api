const Sequelize = require('sequelize');

const {
  RARITIES,
  RARITY_ERROR
} = require('./constants');

const DataTypes = Sequelize.DataTypes;

module.exports = (sequelize) => {
  const Rarity = sequelize.define('rarity', {
    type: {
      field: 'type',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: {
          args: [RARITIES],
          msg: RARITY_ERROR
        }
      }
    },
    value: {
      field: 'value',
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: [
          'type'
        ]
      }
    ],
    timestamps: false,
    underscored: true
  });

  return Rarity;
};
