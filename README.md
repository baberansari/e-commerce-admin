# e-commerce-admin
## Setup
# GIT HUB LINK FOR TESTING   : https://github.com/baberansari/e-commerce-admin.git
- 1. Clone the repository: `git clone <repo-url>`
- 2. Install dependencies: `npm install`
- 3. Create a MySQL database named `ecommerce_admin`
- 4. Configure environment variables in `.env` and put this

- DB_HOST=localhost
- DB_USER=root
- DB_PASS=
- DB_NAME=ecommerce_admin
- PORT=3000

- 5. Seed demo data: `npm run seed`
- 6.  Run the server: `npm start`



/ecommerce-admin-api
├── /src
│   ├── /config
│   │   └── database.js
│   ├── /controllers
│   │   ├── salesController.js
│   │   ├── inventoryController.js
│   │   └── productController.js
│   ├── /models
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Sale.js
│   │   ├── InventoryLog.js
│   │   └── LowStockAlert.js
│   ├── /routes
│   │   ├── sales.js
│   │   ├── inventory.js
│   │   └── products.js
│   ├── /seeders
│   │   └── demo-data.js
│   └── index.js
├── .env
├── package.json
└── README.md


# Dependencies
- express
- sequelize
- mysql2
- dotenv

## API Endpoints
### Sales
- `GET /api/sales?startDate=2025-05-01&endDate=2025-05-04&categoryId=1`: Retrieve sales data with optional filters
- `GET /api/sales/revenue?period=daily&startDate=2025-05-01&endDate=2025-05-04`: Analyze revenue by period
- `GET /api/sales/compare?period1Start=2025-05-01&period1End=2025-05-02&period2Start=2025-05-03&period2End=2025-05-04`: Compare revenue across periods

### Inventory
- `GET /api/inventory`: View current inventory status
- `PUT /api/inventory/update`: Update inventory (`{"productId": 1, "change": -5, "reason": "Sale"}`)

### Products
- `POST /api/products`: Register new product (`{"name": "Headphones", "price": 99.99, "stock": 50, "categoryId": 1}`)

## Database Schema
- **Category**: Stores product categories (`id`, `name`)
- **Product**: Stores product details (`id`, `name`, `price`, `stock`, `categoryId`)
- **Sale**: Tracks sales (`id`, `productId`, `quantity`, `total`, `saleDate`)
- **InventoryLog**: Logs inventory changes (`id`, `productId`, `change`, `reason`, `timestamp`)
- **LowStockAlert**: Monitors low stock (`id`, `productId`, `threshold`, `triggered`)

Relationships:
- Product belongs to Category
- Sale references Product
- InventoryLog references Product
- LowStockAlert references Product

GIT HUB LINK FOR DEMO  : https://github.com/baberansari/e-commerce-admin.git