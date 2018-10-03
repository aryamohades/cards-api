const Sequelize = require('sequelize');

const DataTypes = Sequelize.DataTypes;

module.exports = (sequelize) => {
  const WishlistEntry = sequelize.define('wishlist_entry', {
    condition: {
      field: 'condition',
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      field: 'notes',
      type: DataTypes.STRING,
      allowNull: true
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
    ]
  });

  return WishlistEntry;
};
