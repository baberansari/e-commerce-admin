const Product = require('../models/Product');
const InventoryLog = require('../models/InventoryLog');
const LowStockAlert = require('../models/LowStockAlert');

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Product.findAll({
      attributes: ['id', 'name', 'stock'],
      include: [{ model: LowStockAlert, attributes: ['threshold', 'triggered'] }]
    });
    res.json(inventory);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.updateInventory = async (req, res) => {
  const { productId, change, reason } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    const newStock = product.stock + change;
    if (newStock < 0) return res.status(400).json({ error: 'Insufficient stock' });
    await product.update({ stock: newStock });
    await InventoryLog.create({ productId, change, reason, timestamp: new Date() });
    const alert = await LowStockAlert.findOne({ where: { productId } });
    if (alert && newStock <= alert.threshold) await alert.update({ triggered: true });
    res.json({ message: 'Inventory updated', newStock });
  } catch (error) { res.status(500).json({ error: error.message }); }
};