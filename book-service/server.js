const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = 5002;

app.use(express.json());

// In-memory sample data for books.
const books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", price: 4500 },
  { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt", price: 5200 }
];

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Service API",
      version: "1.0.0",
      description: "Microservice for managing bookstore books"
    },
    servers: [{ url: `http://localhost:${PORT}` }]
  },
  apis: [__filename]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: List of books
 *   post:
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Book created
 *
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single book
 *       404:
 *         description: Book not found
 */
app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const book = books.find((item) => item.id === Number(req.params.id));

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

app.post("/books", (req, res) => {
  const { title, author, price } = req.body;

  const newBook = {
    id: books.length + 1,
    title,
    author,
    price
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

app.get("/", (req, res) => {
  res.json({
    service: "Book Service",
    message: "Service is running",
    docs: `http://localhost:${PORT}/api-docs`
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Book Service running on http://localhost:${PORT}`);
});
