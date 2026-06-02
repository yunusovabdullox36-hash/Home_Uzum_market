# Backend Configuration

## Base URL
Default: `http://localhost:9090` (Configurable via `PORT` environment variable)

## Technologies
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **CORS:** Enabled for all origins
- **Development Tool:** Nodemon

---

# Getting Started (For Frontend Developers)

If you need to run the backend locally:

1. **Prerequisites:**
   - Install [Node.js](https://nodejs.org/)
   - Ensure you have a running [MongoDB](https://www.mongodb.com/) instance (local or Atlas)

2. **Installation:**
   ```bash
   cd server
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the `server` directory and add the following:
   ```env
   PORT=9090
   MONGO_URL=your_mongodb_connection_string
   NODE_ENV=development
   ```

4. **Run Server:**
   ```bash
   npm run dev
   ```
   The server will restart automatically when you save changes.

---

# Project Structure
- `src/index.js`: Entry point and middleware setup.
- `src/routes/`: API route definitions.
- `src/controllers/`: Business logic for each endpoint.
- `src/models/`: Mongoose schemas (Data structure).
- `src/config/`: Database connection configuration.

---

# API Endpoints

## GET /api/products

### Description
Fetches all products from the database.

### Request
Headers:
- Content-Type: application/json

### Success Response
```json
[
  {
    "_id": "60d5ecb3152f8c2e482d5485",
    "title": "Smartphone",
    "description": "High-end smartphone",
    "price": 500,
    "oldPrice": 600,
    "image": "url-to-image",
    "rating": 4.5,
    "reviewsCount": 10,
    "stock": 50,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Error Response
```json
{
  "message": "Error message"
}
```

---

## POST /api/products

### Description
Creates a new product.

### Request
Headers:
- Content-Type: application/json

Body:
```json
{
  "title": "Smartphone",
  "description": "High-end smartphone",
  "price": 500,
  "oldPrice": 600,
  "image": "url-to-image",
  "rating": 4.5,
  "reviewsCount": 10,
  "stock": 50
}
```

### Success Response
```json
{
  "_id": "60d5ecb3152f8c2e482d5485",
  "title": "Smartphone",
  "price": 500,
  ...
}
```

### Error Response
```json
{
  "message": "Validation failed: title is required"
}
```

---

## GET /api/products/:id

### Description
Fetches a single product by its ID.

### Request
Route Params:
| Name | Type   | Required |
| ---- | ------ | -------- |
| id   | String | Yes      |

### Success Response
```json
{
  "_id": "60d5ecb3152f8c2e482d5485",
  "title": "Smartphone",
  ...
}
```

### Error Response
```json
{
  "message": "Mahsulot topilmadi"
}
```

---

## PUT /api/products/:id

### Description
Updates an existing product by its ID.

### Request
Route Params:
| Name | Type   | Required |
| ---- | ------ | -------- |
| id   | String | Yes      |

Body:
```json
{
  "price": 550
}
```

### Success Response
```json
{
  "_id": "60d5ecb3152f8c2e482d5485",
  "title": "Smartphone",
  "price": 550,
  ...
}
```

### Error Response
```json
{
  "message": "Mahsulot topilmadi"
}
```

---

## DELETE /api/products/:id

### Description
Deletes a product by its ID.

### Request
Route Params:
| Name | Type   | Required |
| ---- | ------ | -------- |
| id   | String | Yes      |

### Success Response
```json
{
  "message": "Mahsulot o'chirildi"
}
```

---

## GET /api/users

### Description
Fetches all users.

### Success Response
```json
[
  {
    "_id": "60d5ecb3152f8c2e482d5486",
    "username": "johndoe",
    "email": "john@example.com",
    "createdAt": "..."
  }
]
```

---

## POST /api/users

### Description
Registers a new user.

### Request
Body:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response
```json
{
  "_id": "60d5ecb3152f8c2e482d5486",
  "username": "johndoe",
  "email": "john@example.com"
}
```

---

# Controllers Analysis

## ProductController
* **Business logic:** Manages CRUD operations for the Product model.
* **Returned data:** Product objects or arrays of product objects.
* **Possible errors:** `400 Bad Request` (Validation/Cast error), `404 Not Found`, `500 Internal Server Error`.
* **Validation checks:** Mongoose schema validation for required fields (`title`, `price`, `image`).

## UserController
* **Business logic:** Handles user registration and listing.
* **Returned data:** User objects or arrays of user objects.
* **Possible errors:** `400 Bad Request` (Validation/Unique constraint error), `500 Internal Server Error`.
* **Validation checks:** Username (3-20 chars), Email (unique, lowercase), Password (min 6 chars).

---

# Models

## Product

| Field        | Type   | Required | Unique | Default |
| ------------ | ------ | -------- | ------ | ------- |
| title        | String | Yes      | No     | -       |
| description  | String | No       | No     | ""      |
| price        | Number | Yes      | No     | -       |
| oldPrice     | Number | No       | No     | 0       |
| image        | String | Yes      | No     | -       |
| rating       | Number | No       | No     | 0       |
| reviewsCount | Number | No       | No     | 0       |
| stock        | Number | No       | No     | 0       |

* **References:** None
* **Relationships:** Independent model
* **Indexes:** `createdAt`, `updatedAt` (via timestamps)

## User

| Field    | Type   | Required | Unique | Default |
| -------- | ------ | -------- | ------ | ------- |
| username | String | Yes      | Yes    | -       |
| email    | String | Yes      | Yes    | -       |
| password | String | Yes      | No     | -       |

* **References:** None
* **Relationships:** Independent model
* **Indexes:** `username` (Unique), `email` (Unique)

---

# Frontend Usage Guide

* **Home Page:** `GET /api/products` to display featured products.
* **Product List:** `GET /api/products` (can be extended with query params if implemented).
* **Product Details:** `GET /api/products/:id`.
* **User Profile:** `GET /api/users` (currently lists all, would need specific user logic).
* **Authentication:** `POST /api/users` for registration. Login logic is not yet implemented.
* **Search:** Not explicitly implemented, but `GET /api/products` returns all items.
* **Categories:** Not explicitly implemented in the schema.

---

# Quick API Cheat Sheet

| Method | Route               | Description                |
| ------ | ------------------- | -------------------------- |
| GET    | /api/products       | Get all products           |
| POST   | /api/products       | Create a new product       |
| GET    | /api/products/:id   | Get product details        |
| PUT    | /api/products/:id   | Update a product           |
| DELETE | /api/products/:id   | Delete a product           |
| GET    | /api/users          | Get all users              |
| POST   | /api/users          | Register a new user        |
