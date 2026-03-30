const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = 5006;

app.use(express.json());

// In-memory sample data for notifications.
const notifications = [
  { id: 1, userId: 1, message: "Your order has been placed", type: "Order" },
  { id: 2, userId: 2, message: "Payment received successfully", type: "Payment" }
];

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notification Service API",
      version: "1.0.0",
      description: "Microservice for managing bookstore notifications"
    },
    servers: [{ url: `http://localhost:${PORT}` }]
  },
  apis: [__filename]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get all notifications
 *     responses:
 *       200:
 *         description: List of notifications
 *   post:
 *     summary: Create a new notification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               message:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notification created
 *
 * /notifications/{id}:
 *   get:
 *     summary: Get a notification by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single notification
 *       404:
 *         description: Notification not found
 */
app.get("/notifications", (req, res) => {
  res.json(notifications);
});

app.get("/notifications/:id", (req, res) => {
  const notification = notifications.find((item) => item.id === Number(req.params.id));

  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }

  res.json(notification);
});

app.post("/notifications", (req, res) => {
  const { userId, message, type } = req.body;

  const newNotification = {
    id: notifications.length + 1,
    userId,
    message,
    type
  };

  notifications.push(newNotification);
  res.status(201).json(newNotification);
});

app.get("/", (req, res) => {
  res.json({
    service: "Notification Service",
    message: "Service is running",
    docs: `http://localhost:${PORT}/api-docs`
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Notification Service running on http://localhost:${PORT}`);
});
