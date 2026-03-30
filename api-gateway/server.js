const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = 5000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstore API Gateway",
      version: "1.0.0",
      description: "Single entry point for all bookstore microservices"
    },
    tags: [
      {
        name: "Users",
        description: "User service routes exposed through the API Gateway"
      },
      {
        name: "Books",
        description: "Book service routes exposed through the API Gateway"
      },
      {
        name: "Orders",
        description: "Order service routes exposed through the API Gateway"
      },
      {
        name: "Payments",
        description: "Payment service routes exposed through the API Gateway"
      },
      {
        name: "Reviews",
        description: "Review service routes exposed through the API Gateway"
      },
      {
        name: "Notifications",
        description: "Notification service routes exposed through the API Gateway"
      }
    ],
    servers: [{ url: `http://localhost:${PORT}` }]
  },
  apis: [__filename]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users through the API Gateway
 *     responses:
 *       200:
 *         description: List of users
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a user through the API Gateway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nimal Silva
 *               email:
 *                 type: string
 *                 example: nimal@example.com
 *     responses:
 *       201:
 *         description: User created
 *
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get one user by ID through the API Gateway
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Single user
 *
 * /api/books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all books through the API Gateway
 *     responses:
 *       200:
 *         description: List of books
 *   post:
 *     tags:
 *       - Books
 *     summary: Create a book through the API Gateway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Domain-Driven Design
 *               author:
 *                 type: string
 *                 example: Eric Evans
 *               price:
 *                 type: number
 *                 example: 6000
 *     responses:
 *       201:
 *         description: Book created
 *
 * /api/books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get one book by ID through the API Gateway
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Single book
 *
 * /api/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get all orders through the API Gateway
 *     responses:
 *       200:
 *         description: List of orders
 *   post:
 *     tags:
 *       - Orders
 *     summary: Create an order through the API Gateway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               bookId:
 *                 type: integer
 *                 example: 2
 *               quantity:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: Placed
 *     responses:
 *       201:
 *         description: Order created
 *
 * /api/orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get one order by ID through the API Gateway
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Single order
 *
 * /api/payments:
 *   get:
 *     tags:
 *       - Payments
 *     summary: Get all payments through the API Gateway
 *     responses:
 *       200:
 *         description: List of payments
 *   post:
 *     tags:
 *       - Payments
 *     summary: Create a payment through the API Gateway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *                 example: 1
 *               amount:
 *                 type: number
 *                 example: 5200
 *               method:
 *                 type: string
 *                 example: Card
 *               status:
 *                 type: string
 *                 example: Paid
 *     responses:
 *       201:
 *         description: Payment created
 *
 * /api/payments/{id}:
 *   get:
 *     tags:
 *       - Payments
 *     summary: Get one payment by ID through the API Gateway
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Single payment
 *
 * /api/reviews:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get all reviews through the API Gateway
 *     responses:
 *       200:
 *         description: List of reviews
 *   post:
 *     tags:
 *       - Reviews
 *     summary: Create a review through the API Gateway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 example: 2
 *               rating:
 *                 type: integer
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Excellent book
 *     responses:
 *       201:
 *         description: Review created
 *
 * /api/reviews/{id}:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get one review by ID through the API Gateway
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Single review
 *
 * /api/notifications:
 *   get:
 *     tags:
 *       - Notifications
 *     summary: Get all notifications through the API Gateway
 *     responses:
 *       200:
 *         description: List of notifications
 *   post:
 *     tags:
 *       - Notifications
 *     summary: Create a notification through the API Gateway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               message:
 *                 type: string
 *                 example: Your order is confirmed
 *               type:
 *                 type: string
 *                 example: Order
 *     responses:
 *       201:
 *         description: Notification created
 *
 * /api/notifications/{id}:
 *   get:
 *     tags:
 *       - Notifications
 *     summary: Get one notification by ID through the API Gateway
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Single notification
 */

// The gateway gives one entry point for all microservices.
app.use(
  "/api/users",
  createProxyMiddleware({
    target: "http://localhost:5001",
    changeOrigin: true,
    pathRewrite: (path) => `/users${path}`
  })
);

app.use(
  "/api/books",
  createProxyMiddleware({
    target: "http://localhost:5002",
    changeOrigin: true,
    pathRewrite: (path) => `/books${path}`
  })
);

app.use(
  "/api/orders",
  createProxyMiddleware({
    target: "http://localhost:5003",
    changeOrigin: true,
    pathRewrite: (path) => `/orders${path}`
  })
);

app.use(
  "/api/payments",
  createProxyMiddleware({
    target: "http://localhost:5004",
    changeOrigin: true,
    pathRewrite: (path) => `/payments${path}`
  })
);

app.use(
  "/api/reviews",
  createProxyMiddleware({
    target: "http://localhost:5005",
    changeOrigin: true,
    pathRewrite: (path) => `/reviews${path}`
  })
);

app.use(
  "/api/notifications",
  createProxyMiddleware({
    target: "http://localhost:5006",
    changeOrigin: true,
    pathRewrite: (path) => `/notifications${path}`
  })
);

app.get("/", (req, res) => {
  res.json({
    service: "API Gateway",
    message: "Gateway is running",
    docs: `http://localhost:${PORT}/api-docs`,
    routes: {
      users: "http://localhost:5000/api/users",
      books: "http://localhost:5000/api/books",
      orders: "http://localhost:5000/api/orders",
      payments: "http://localhost:5000/api/payments",
      reviews: "http://localhost:5000/api/reviews",
      notifications: "http://localhost:5000/api/notifications"
    }
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});
