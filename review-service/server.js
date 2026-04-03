const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = 5005;

app.use(express.json());

let reviews = [
  { id: 1, bookId: 1, userId: 2, rating: 5, comment: "Very useful book" },
  { id: 2, bookId: 2, userId: 1, rating: 4, comment: "Easy to understand" }
];

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Review Service API",
      version: "1.0.0",
      description: "Microservice for managing bookstore reviews - customers can create, view, update and delete reviews"
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
 *         description: List of all reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   bookId:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   rating:
 *                     type: integer
 *                   comment:
 *                     type: string
 *   post:
 *     summary: Create a new review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - userId
 *               - rating
 *               - comment
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
 *                 example: "Excellent book, highly recommend!"
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Missing required fields
 *
 * /reviews/book/{bookId}:
 *   get:
 *     summary: Get all reviews for a specific book
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of reviews for the book
 *       404:
 *         description: No reviews found for this book
 *
 * /reviews/{id}:
 *   get:
 *     summary: Get a single review by ID
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
 *   put:
 *     summary: Update a review by ID
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
 *               rating:
 *                 type: integer
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "Updated my review after re-reading"
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       404:
 *         description: Review not found
 *   delete:
 *     summary: Delete a review by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */

app.get("/", (req, res) => {
  res.json({
    service: "Review Service",
    message: "Service is running",
    docs: `http://localhost:${PORT}/api-docs`
  });
});

app.get("/reviews", (req, res) => {
  res.json(reviews);
});

app.get("/reviews/book/:bookId", (req, res) => {
  const bookReviews = reviews.filter(
    (r) => r.bookId === Number(req.params.bookId)
  );
  if (bookReviews.length === 0) {
    return res.status(404).json({ message: "No reviews found for this book" });
  }
  res.json(bookReviews);
});

app.get("/reviews/:id", (req, res) => {
  const review = reviews.find((r) => r.id === Number(req.params.id));
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  res.json(review);
});

app.post("/reviews", (req, res) => {
  const { bookId, userId, rating, comment } = req.body;

  if (!bookId || !userId || !rating || !comment) {
    return res.status(400).json({
      message: "bookId, userId, rating, and comment are all required"
    });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

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

app.put("/reviews/:id", (req, res) => {
  const review = reviews.find((r) => r.id === Number(req.params.id));
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  const { rating, comment } = req.body;

  if (rating !== undefined) {
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }
    review.rating = rating;
  }

  if (comment !== undefined) {
    review.comment = comment;
  }

  res.json({ message: "Review updated successfully", review });
});

app.delete("/reviews/:id", (req, res) => {
  const index = reviews.findIndex((r) => r.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Review not found" });
  }

  const deleted = reviews.splice(index, 1);
  res.json({ message: "Review deleted successfully", review: deleted[0] });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Review Service running on http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});

