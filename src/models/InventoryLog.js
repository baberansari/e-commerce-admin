const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const InventoryLog = sequelize.define('InventoryLog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  change: { type: DataTypes.INTEGER, allowNull: false },
  reason: { type: DataTypes.STRING, allowNull: false },
  timestamp: { type: DataTypes.DATE, allowNull: false }
}, {
  indexes: [{ fields: ['productId'] }, { fields: ['timestamp'] }]
});

module.exports = InventoryLog;