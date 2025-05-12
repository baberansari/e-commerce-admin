const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const Category = require('./Category');
const Sale = require('./Sale');
const InventoryLog = require('./InventoryLog');
const LowStockAlert = require('./LowStockAlert');


Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

Sale.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Sale, { foreignKey: 'productId' });

InventoryLog.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(InventoryLog, { foreignKey: 'productId' });

LowStockAlert.belongsTo(Product, { foreignKey: 'productId' });
Product.hasOne(LowStockAlert, { foreignKey: 'productId' });

module.exports = {
  Sequelize,
  sequelize,
  Product,
  Category,
  Sale,
  InventoryLog,
  LowStockAlert
};