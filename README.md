# Bookstore Microservices Backend

## Project Overview

This project is a beginner-friendly microservices backend built for a university assignment. It models a simple online bookstore using Node.js and Express.js. Each service is independent, runs on its own port, uses in-memory sample data, and exposes simple REST API endpoints with Swagger documentation.

There is no frontend, no database, and no advanced infrastructure. The main goal is to clearly demonstrate the microservices concept and the role of an API Gateway in a way that is easy to explain during a viva.

## Architecture

The system contains:

- 1 API Gateway
- 6 independent microservices
- In-memory arrays for sample data
- REST APIs for CRUD-style MVP operations
- Swagger UI on every service

### Text Architecture Diagram

```text
                           +----------------------+
Client / Postman / Browser |     API Gateway      |
                           |      Port 5000       |
                           +----------+-----------+
                                      |
        -----------------------------------------------------------------
        |              |              |              |          |         |
        v              v              v              v          v         v
+---------------+ +---------------+ +---------------+ +---------------+ +---------------+ +--------------------+
| User Service  | | Book Service  | | Order Service | | Payment       | | Review Service| | Notification       |
| Port 5001     | | Port 5002     | | Port 5003     | | Service       | | Port 5005     | | Service            |
| /users        | | /books        | | /orders       | | Port 5004     | | /reviews      | | Port 5006          |
+---------------+ +---------------+ +---------------+ | /payments     | +---------------+ | /notifications     |
                                                      +---------------+                   +--------------------+
```

## Services and Ports

| Component | Port | Base Path |
|-----------|------|-----------|
| API Gateway | 5000 | `/api` |
| User Service | 5001 | `/users` |
| Book Service | 5002 | `/books` |
| Order Service | 5003 | `/orders` |
| Payment Service | 5004 | `/payments` |
| Review Service | 5005 | `/reviews` |
| Notification Service | 5006 | `/notifications` |

## Folder Structure

```text
bookstore-microservices/
  api-gateway/
    package.json
    server.js
  user-service/
    package.json
    server.js
  book-service/
    package.json
    server.js
  order-service/
    package.json
    server.js
  payment-service/
    package.json
    server.js
  review-service/
    package.json
    server.js
  notification-service/
    package.json
    server.js
  README.md
```

## API Endpoints

### User Service

- `GET /users`
- `GET /users/:id`
- `POST /users`

### Book Service

- `GET /books`
- `GET /books/:id`
- `POST /books`

### Order Service

- `GET /orders`
- `GET /orders/:id`
- `POST /orders`

### Payment Service

- `GET /payments`
- `GET /payments/:id`
- `POST /payments`

### Review Service

- `GET /reviews`
- `GET /reviews/:id`
- `POST /reviews`

### Notification Service

- `GET /notifications`
- `GET /notifications/:id`
- `POST /notifications`

## API Gateway Routes

The API Gateway provides a single entry point:

- `/api/users` -> User Service
- `/api/books` -> Book Service
- `/api/orders` -> Order Service
- `/api/payments` -> Payment Service
- `/api/reviews` -> Review Service
- `/api/notifications` -> Notification Service

## Swagger Documentation

Each service has its own Swagger UI:

- User Service: `http://localhost:5001/api-docs`
- Book Service: `http://localhost:5002/api-docs`
- Order Service: `http://localhost:5003/api-docs`
- Payment Service: `http://localhost:5004/api-docs`
- Review Service: `http://localhost:5005/api-docs`
- Notification Service: `http://localhost:5006/api-docs`

## Installation

Open a terminal in the `bookstore-microservices` folder and install dependencies for each folder separately.

```powershell
cd bookstore-microservices

cd user-service
npm install
cd ..

cd book-service
npm install
cd ..

cd order-service
npm install
cd ..

cd payment-service
npm install
cd ..

cd review-service
npm install
cd ..

cd notification-service
npm install
cd ..

cd api-gateway
npm install
cd ..

npm install
```

The final `npm install` at the root installs `concurrently`, which is used to start all services with one command.

## How to Run Each Service

Use a separate terminal for each service.

### Terminal 1

```powershell
cd bookstore-microservices\user-service
npm start
```

### Terminal 2

```powershell
cd bookstore-microservices\book-service
npm start
```

### Terminal 3

```powershell
cd bookstore-microservices\order-service
npm start
```

### Terminal 4

```powershell
cd bookstore-microservices\payment-service
npm start
```

### Terminal 5

```powershell
cd bookstore-microservices\review-service
npm start
```

### Terminal 6

```powershell
cd bookstore-microservices\notification-service
npm start
```

### Terminal 7

```powershell
cd bookstore-microservices\api-gateway
npm start
```

## Run One Service From The Root Folder

From the `bookstore-microservices` root folder, you can start any individual service without changing directories:

```powershell
npm run start:user
npm run start:book
npm run start:order
npm run start:payment
npm run start:review
npm run start:notification
npm run start:gateway
```

Each root command first frees the service's fixed port, so restarting from the root will not fail with `EADDRINUSE` if an older copy of that same service is still running.

## Run All Services With One Command

From the `bookstore-microservices` root folder:

```powershell
npm start
```

You can also use:

```powershell
npm run start:all
```

`npm run dev` still points to the same all-services command.

This command also frees ports `5000` to `5006` before launching the services, so it can be re-run without manually stopping old service processes first.

This starts:

- User Service on `5001`
- Book Service on `5002`
- Order Service on `5003`
- Payment Service on `5004`
- Review Service on `5005`
- Notification Service on `5006`
- API Gateway on `5000`

## How to Test Each Service Directly

You can test using a browser for `GET` requests, Swagger UI, Postman, or curl.

### User Service

- `GET http://localhost:5001/users`
- `GET http://localhost:5001/users/1`
- `POST http://localhost:5001/users`

Sample JSON:

```json
{
  "name": "Nimal Silva",
  "email": "nimal@example.com"
}
```

### Book Service

- `GET http://localhost:5002/books`
- `GET http://localhost:5002/books/1`
- `POST http://localhost:5002/books`

Sample JSON:

```json
{
  "title": "Domain-Driven Design",
  "author": "Eric Evans",
  "price": 6000
}
```

### Order Service

- `GET http://localhost:5003/orders`
- `GET http://localhost:5003/orders/1`
- `POST http://localhost:5003/orders`

Sample JSON:

```json
{
  "userId": 1,
  "bookId": 2,
  "quantity": 1,
  "status": "Placed"
}
```

### Payment Service

- `GET http://localhost:5004/payments`
- `GET http://localhost:5004/payments/1`
- `POST http://localhost:5004/payments`

Sample JSON:

```json
{
  "orderId": 1,
  "amount": 5200,
  "method": "Card",
  "status": "Paid"
}
```

### Review Service

- `GET http://localhost:5005/reviews`
- `GET http://localhost:5005/reviews/1`
- `POST http://localhost:5005/reviews`

Sample JSON:

```json
{
  "bookId": 1,
  "userId": 2,
  "rating": 5,
  "comment": "Excellent book"
}
```

### Notification Service

- `GET http://localhost:5006/notifications`
- `GET http://localhost:5006/notifications/1`
- `POST http://localhost:5006/notifications`

Sample JSON:

```json
{
  "userId": 1,
  "message": "Your order is confirmed",
  "type": "Order"
}
```

## How to Test Through the API Gateway

Make sure all six services and the gateway are running first.

### Gateway User Routes

- `GET http://localhost:5000/api/users`
- `GET http://localhost:5000/api/users/1`
- `POST http://localhost:5000/api/users`

### Gateway Book Routes

- `GET http://localhost:5000/api/books`
- `GET http://localhost:5000/api/books/1`
- `POST http://localhost:5000/api/books`

### Gateway Order Routes

- `GET http://localhost:5000/api/orders`
- `GET http://localhost:5000/api/orders/1`
- `POST http://localhost:5000/api/orders`

### Gateway Payment Routes

- `GET http://localhost:5000/api/payments`
- `GET http://localhost:5000/api/payments/1`
- `POST http://localhost:5000/api/payments`

### Gateway Review Routes

- `GET http://localhost:5000/api/reviews`
- `GET http://localhost:5000/api/reviews/1`
- `POST http://localhost:5000/api/reviews`

### Gateway Notification Routes

- `GET http://localhost:5000/api/notifications`
- `GET http://localhost:5000/api/notifications/1`
- `POST http://localhost:5000/api/notifications`

## Example curl Commands

```powershell
curl http://localhost:5001/users
curl http://localhost:5000/api/books
curl http://localhost:5003/orders/1
```

Example POST request:

```powershell
curl -X POST http://localhost:5000/api/reviews `
  -H "Content-Type: application/json" `
  -d "{\"bookId\":1,\"userId\":1,\"rating\":5,\"comment\":\"Great book\"}"
```

## Suggested Team Member Contributions

This section helps each group member explain their part of the assignment.

- Team Member 1: User Service implementation and Swagger documentation
- Team Member 2: Book Service implementation and Swagger documentation
- Team Member 3: Order Service and Payment Service implementation
- Team Member 4: Review Service and Notification Service implementation
- Team Member 5: API Gateway setup, route testing, and README preparation

## Notes for Viva

- Each service is independent and can run on its own.
- The API Gateway acts as a single entry point for clients.
- All data is stored in arrays, so the project is simple and easy to understand.
- Swagger is included in every service to demonstrate and test the APIs.
- This is an MVP design focused on architecture, routing, and service separation.
