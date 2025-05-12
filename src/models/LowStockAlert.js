const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LowStockAlert = sequelize.define('LowStockAlert', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  threshold: { type: DataTypes.INTEGER, allowNull: false },
  triggered: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  indexes: [{ fields: ['productId'] }]
});

module.exports = LowStockAlert;