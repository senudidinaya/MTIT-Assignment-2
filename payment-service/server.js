const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = 5004;

app.use(express.json());

// In-memory sample data for payments.
let payments = [
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
 *         description: List of all payments
 *   post:
 *     summary: Create a new payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - amount
 *               - method
 *             properties:
 *               orderId:
 *                 type: integer
 *                 example: 1
 *               amount:
 *                 type: number
 *                 example: 5200
 *               method:
 *                 type: string
 *                 example: "Card"
 *               status:
 *                 type: string
 *                 example: "Pending"
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Missing required fields
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
 *   put:
 *     summary: Update payment status only (Pending / Paid / Refunded)
 *     description: In real financial systems, only the status of a payment can be updated. Amount and method cannot be changed after creation.
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
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: "Refunded"
 *     responses:
 *       200:
 *         description: Payment status updated successfully
 *       400:
 *         description: Invalid status value
 *       404:
 *         description: Payment not found
 */

app.get("/", (req, res) => {
  res.json({
    service: "Payment Service",
    message: "Service is running",
    docs: `http://localhost:${PORT}/api-docs`
  });
});

// GET all payments
app.get("/payments", (req, res) => {
  res.json(payments);
});

// GET single payment by ID
app.get("/payments/:id", (req, res) => {
  const payment = payments.find((item) => item.id === Number(req.params.id));
  
  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }

  res.json(payment);
});

// POST create a new payment
app.post("/payments", (req, res) => {
  const { orderId, amount, method, status } = req.body;

  if (!orderId || !amount || !method) {
    return res.status(400).json({
      message: "orderId, amount, and method are required"
    });
  }

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

// PUT update payment status only
// In real financial systems, you never delete or fully edit a payment record.
// Only the status can change: Pending → Paid → Refunded
app.put("/payments/:id", (req, res) => {
  const payment = payments.find((item) => item.id === Number(req.params.id));
  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }

  const { status } = req.body;
  const allowedStatuses = ["Pending", "Paid", "Refunded", "Failed"];

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: `Invalid status. Allowed values: ${allowedStatuses.join(", ")}`
    });
  }

  payment.status = status;
  res.json({ message: "Payment status updated successfully", payment });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Payment Service running on http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});

