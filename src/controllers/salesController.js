const { Sale, Product, Category, Sequelize ,sequelize} = require('../models');
const { Op } = Sequelize;
exports.getSales = async (req, res) => {
  const { startDate, endDate, productId, categoryId } = req.query;
  const where = {};
  if (startDate && endDate) where.saleDate = { [Op.between]: [startDate, endDate] };
  if (productId) where.productId = productId;
  try {
    console.log('Fatch Sale  ');
    const sales = await Sale.findAll({
      where,
      include: [
        {
          model: Product,
          attributes: ['name', 'categoryId'],
        }],
        order: [['saleDate', 'DESC']]
    });
    res.json(sales);
  } catch (error) { res.status(500).json({ error: error.message }); }
};
exports.getRevenue = async (req, res) => {
  const { period = 'daily', startDate, endDate } = req.query; // Default to 'daily'
  let groupByFn;
  let groupByField;

  // Define the grouping function based on period
  switch (period) {
    case 'daily':
      groupByFn = Sequelize.fn('DATE', Sequelize.col('Sale.saleDate'));
      groupByField = 'date';
      break;
    case 'weekly':
      groupByFn = Sequelize.fn('WEEK', Sequelize.col('Sale.saleDate'));
      groupByField = 'week';
      break;
    case 'monthly':
      groupByFn = Sequelize.fn('MONTH', Sequelize.col('Sale.saleDate'));
      groupByField = 'month';
      break;
    case 'annually':
      groupByFn = Sequelize.fn('YEAR', Sequelize.col('Sale.saleDate'));
      groupByField = 'year';
      break;
    default:
      return res.status(400).json({ error: 'Invalid period. Use daily, weekly, monthly, or annually.' });
  }

  console.log(groupByFn);
  console.log(groupByField);
  try {
    const revenue = await Sale.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('Sale.total')), 'totalRevenue'],
        [groupByFn, 'period']
      ],
      where: startDate && endDate ? { saleDate: { [Op.between]: [startDate, endDate] } } : {},
      include: [
        {
          model: Product,
          attributes: ['id', 'name'],
          include: [
            {
              model: Category,
              attributes: ['id', 'name']
            }
          ]
        }
      ],
      group: [
        groupByFn,
        'Product.id',
        'Product.name',
        'Product->Category.id',
        'Product->Category.name'
      ],
      order: [[Sequelize.col('period'), 'ASC']]
    });
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.compareRevenue = async (req, res) => {
  const { period1Start, period1End, period2Start, period2End, categoryId } = req.query;
  try {
    
    const [period1, period2] = await Promise.all([
      Sale.findAll({
        attributes: [[Sequelize.fn('SUM', Sequelize.col('Sale.total')), 'totalRevenue']],
        where: { saleDate: { [Op.between]: [period1Start, period1End] } },
        include: [
          {
            model: Product,
            where: categoryId ? { categoryId } : {},
            attributes: ['id', 'name'],
            include: [{ model: Category, attributes: ['id', 'name'] }]
          }
        ],
        group: ['Product.id', 'Product.name', 'Product->Category.id', 'Product->Category.name']
      }),
      Sale.findAll({
        attributes: [[Sequelize.fn('SUM', Sequelize.col('Sale.total')), 'totalRevenue']],
        where: { saleDate: { [Op.between]: [period2Start, period2End] } },
        include: [
          {
            model: Product,
            where: categoryId ? { categoryId } : {},
            attributes: ['id', 'name'],
            include: [{ model: Category, attributes: ['id', 'name'] }]
          }
        ],
        group: ['Product.id', 'Product.name', 'Product->Category.id', 'Product->Category.name']
      })
    ]);
    // console.log(res);
    res.json({
      period1: period1.map(item => ({
        totalRevenue: item.get('totalRevenue'),
        product: item.Product ? { id: item.Product.id, name: item.Product.name, category: item.Product.Category } : null
      })),
      period2: period2.map(item => ({
        totalRevenue: item.get('totalRevenue'),
        product: item.Product ? { id: item.Product.id, name: item.Product.name, category: item.Product.Category } : null
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};