const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = 5003;

app.use(express.json());

// In-memory sample data for orders.
const orders = [
  { id: 1, userId: 1, bookId: 2, quantity: 1, status: "Placed" },
  { id: 2, userId: 2, bookId: 1, quantity: 2, status: "Processing" }
];

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Order Service API",
      version: "1.0.0",
      description: "Microservice for managing bookstore orders"
    },
    servers: [{ url: `http://localhost:${PORT}` }]
  },
  apis: [__filename]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: List of orders
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               bookId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created
 *
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single order
 *       404:
 *         description: Order not found
 *   put:
 *     summary: Update an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               bookId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated
 *       404:
 *         description: Order not found
 *   delete:
 *     summary: Delete an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order deleted
 *       404:
 *         description: Order not found
 */
app.get("/orders", (req, res) => {
  res.json(orders);
});

app.get("/orders/:id", (req, res) => {
  const order = orders.find((item) => item.id === Number(req.params.id));

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
});

app.post("/orders", (req, res) => {
  const { userId, bookId, quantity, status } = req.body;

  const newOrder = {
    id: orders.length + 1,
    userId,
    bookId,
    quantity,
    status: status || "Placed"
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.put("/orders/:id", (req, res) => {
  const order = orders.find((item) => item.id === Number(req.params.id));

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  const { userId, bookId, quantity, status } = req.body;

  order.userId = userId !== undefined ? userId : order.userId;
  order.bookId = bookId !== undefined ? bookId : order.bookId;
  order.quantity = quantity !== undefined ? quantity : order.quantity;
  order.status = status !== undefined ? status : order.status;

  res.json(order);
});

app.delete("/orders/:id", (req, res) => {
  const orderIndex = orders.findIndex((item) => item.id === Number(req.params.id));

  if (orderIndex === -1) {
    return res.status(404).json({ message: "Order not found" });
  }

  const deletedOrder = orders.splice(orderIndex, 1);
  res.json({ message: "Order deleted", order: deletedOrder[0] });
});

app.get("/", (req, res) => {
  res.json({
    service: "Order Service",
    message: "Service is running",
    docs: `http://localhost:${PORT}/api-docs`
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Order Service running on http://localhost:${PORT}`);
});
