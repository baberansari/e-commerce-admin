const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sale = sequelize.define('Sale', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  saleDate: { type: DataTypes.DATE, allowNull: false }
}, {
  indexes: [{ fields: ['saleDate'] }, { fields: ['productId'] }]
});

module.exports = Sale;