const Sequelize = require('sequelize');

const {
  VALID_GRADES,
  PSA_BGS_ERROR,
  PSA_GRADE_ERROR,
  BGS_GRADE_ERROR
} = require('./constants');

const DataTypes = Sequelize.DataTypes;

module.exports = (sequelize) => {
  const CollectionEntry = sequelize.define('collection_entry', {
    condition: {
      field: 'condition',
      type: DataTypes.STRING,
      allowNull: true
    },
    psa: {
      field: 'psa',
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: {
          args: [VALID_GRADES],
          msg: PSA_GRADE_ERROR
        }
      }
    },
    bgs: {
      field: 'bgs',
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: {
          args: [VALID_GRADES],
          msg: BGS_GRADE_ERROR
        }
      }
    },
    notes: {
      field: 'notes',
      type: DataTypes.STRING,
      allowNull: true
    },
    saleOrTrade: {
      field: 'sale_or_trade',
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: [
          'user_id',
          'card_id'
        ]
      }
    ],
    validate: {
      psaOrBgs() {
        if (this.psa !== undefined && this.bgs !== undefined) {
          if (this.psa !== null && this.bgs !== null) {
            throw new Error(PSA_BGS_ERROR);
          }
        }
      }
    }
  });

  return CollectionEntry;
};
