const Sequelize = require('sequelize');

const DataTypes = Sequelize.DataTypes;

module.exports = (sequelize) => {
  const CardSet = sequelize.define('series', {
    name: {
      field: 'name',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    search: {
      field: 'search',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    sequence: {
      field: 'sequence',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    size: {
      field: 'size',
      type: DataTypes.INTEGER
    },
    release: {
      field: 'release',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    image: {
      field: 'image',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    symbol: {
      field: 'symbol',
      type: DataTypes.STRING,
      allowNull: true
    },
    firstEdition: {
      field: 'first_edition',
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: [
          'name'
        ]
      }
    ],
    timestamps: false,
    underscored: true
  });

  return CardSet;
};
