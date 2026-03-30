const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = 5004;

app.use(express.json());

// In-memory sample data for payments.
const payments = [
  { id: 1, orderId: 1, amount: 5200, method: "Card", status: "Paid" },
  { id: 2, orderId: 2, amount: 9000, method: "Cash on Delivery", status: "Pending" }
];

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Payment Service API",
      version: "1.0.0",
      description: "Microservice for managing bookstore payments"
    },
    servers: [{ url: `http://localhost:${PORT}` }]
  },
  apis: [__filename]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments
 *     responses:
 *       200:
 *         description: List of payments
 *   post:
 *     summary: Create a new payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *               amount:
 *                 type: number
 *               method:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment created
 *
 * /payments/{id}:
 *   get:
 *     summary: Get a payment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single payment
 *       404:
 *         description: Payment not found
 */
app.get("/payments", (req, res) => {
  res.json(payments);
});

app.get("/payments/:id", (req, res) => {
  const payment = payments.find((item) => item.id === Number(req.params.id));

  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }

  res.json(payment);
});

app.post("/payments", (req, res) => {
  const { orderId, amount, method, status } = req.body;

  const newPayment = {
    id: payments.length + 1,
    orderId,
    amount,
    method,
    status: status || "Pending"
  };

  payments.push(newPayment);
  res.status(201).json(newPayment);
});

app.get("/", (req, res) => {
  res.json({
    service: "Payment Service",
    message: "Service is running",
    docs: `http://localhost:${PORT}/api-docs`
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Payment Service running on http://localhost:${PORT}`);
});
