const Product = require('../models/Product');
const Category = require('../models/Category');
const LowStockAlert = require('../models/LowStockAlert');

exports.registerProduct = async (req, res) => {
  const { name, price, stock, categoryId } = req.body;
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    const product = await Product.create({ name, price, stock, categoryId });
    await LowStockAlert.create({ productId: product.id, threshold: 10 });
    res.status(201).json(product);
  } catch (error) { res.status(500).json({ error: error.message }); }
};