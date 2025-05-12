const sequelize = require('../config/database');

const Product = require('../models/Product');
const Category = require('../models/Category');
const Sale = require('../models/Sale');
const InventoryLog = require('../models/InventoryLog');
const LowStockAlert = require('../models/LowStockAlert');

async function seed() {
  await sequelize.sync({ force: true });

  const categories = await Category.bulkCreate([
    { name: 'Electronics' },
    { name: 'Books' },
    { name: 'Clothing' }
  ]);

  const products = await Product.bulkCreate([
    { name: 'Smartphone', price: 699.99, stock: 50, categoryId: 1 },
    { name: 'Laptop', price: 999.99, stock: 30, categoryId: 1 },
    { name: 'Novel', price: 19.99, stock: 100, categoryId: 2 },
    { name: 'T-Shirt', price: 29.99, stock: 80, categoryId: 3 }
  ]);

  await LowStockAlert.bulkCreate([
    { productId: 1, threshold: 10 },
    { productId: 2, threshold: 5 },
    { productId: 3, threshold: 20 },
    { productId: 4, threshold: 15 }
  ]);

  await Sale.bulkCreate([
    { productId: 1, quantity: 5, total: 3499.95, saleDate: '2025-05-01' },
    { productId: 2, quantity: 2, total: 1999.98, saleDate: '2025-05-02' },
    { productId: 3, quantity: 10, total: 199.90, saleDate: '2025-05-03' },
    { productId: 4, quantity: 8, total: 239.92, saleDate: '2025-05-04' }
  ]);

  await InventoryLog.bulkCreate([
    { productId: 1, change: -5, reason: 'Sale', timestamp: '2025-05-01' },
    { productId: 2, change: -2, reason: 'Sale', timestamp: '2025-05-02' },
    { productId: 3, change: 50, reason: 'Restock', timestamp: '2025-05-03' }
  ]);

  console.log('Demo data seeded');
  await sequelize.close();
}

seed();