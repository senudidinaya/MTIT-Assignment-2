const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = 5005;

app.use(express.json());

// In-memory sample data for reviews.
const reviews = [
  { id: 1, bookId: 1, userId: 2, rating: 5, comment: "Very useful book" },
  { id: 2, bookId: 2, userId: 1, rating: 4, comment: "Easy to understand" }
];

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Review Service API",
      version: "1.0.0",
      description: "Microservice for managing bookstore reviews"
    },
    servers: [{ url: `http://localhost:${PORT}` }]
  },
  apis: [__filename]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     responses:
 *       200:
 *         description: List of reviews
 *   post:
 *     summary: Create a new review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created
 *
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single review
 *       404:
 *         description: Review not found
 */
app.get("/reviews", (req, res) => {
  res.json(reviews);
});

app.get("/reviews/:id", (req, res) => {
  const review = reviews.find((item) => item.id === Number(req.params.id));

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  res.json(review);
});

app.post("/reviews", (req, res) => {
  const { bookId, userId, rating, comment } = req.body;

  const newReview = {
    id: reviews.length + 1,
    bookId,
    userId,
    rating,
    comment
  };

  reviews.push(newReview);
  res.status(201).json(newReview);
});

app.get("/", (req, res) => {
  res.json({
    service: "Review Service",
    message: "Service is running",
    docs: `http://localhost:${PORT}/api-docs`
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Review Service running on http://localhost:${PORT}`);
});
