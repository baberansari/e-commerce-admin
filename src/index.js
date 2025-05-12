const express = require('express');
const sequelize = require('./config/database');
const salesRoutes = require('./routes/sales');
const inventoryRoutes = require('./routes/inventory');
const productRoutes = require('./routes/products');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/sales', salesRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});