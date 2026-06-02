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

## Products (/api/products)

| Method | Route | Description |
| --- | --- | --- |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product by ID |
| DELETE | `/api/products/:id` | Delete product by ID |

## Users (/api/users)

| Method | Route | Description |
| --- | --- | --- |
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Register new user |

## Comments (/api/comments)

| Method | Route | Description |
| --- | --- | --- |
| GET | `/api/comments` | Get all comments (populated with user and product) |
| GET | `/api/comments/:id` | Get comment by ID |
| POST | `/api/comments` | Create new comment |
| PUT | `/api/comments/:id` | Update comment |
| DELETE | `/api/comments/:id` | Delete comment |

**POST/PUT Body:**
```json
{
  "user": "userId",
  "product": "productId",
  "text": "Comment text",
  "rating": 5
}
```

## Favorites (/api/favorites)

| Method | Route | Description |
| --- | --- | --- |
| GET | `/api/favorites/:userId` | Get user's favorites (populated with products) |
| POST | `/api/favorites` | Add product to favorites |
| DELETE | `/api/favorites/:userId/:productId` | Remove product from favorites |

**POST Body:**
```json
{
  "userId": "...",
  "productId": "..."
}
```

## Cart (/api/carts)

| Method | Route | Description |
| --- | --- | --- |
| GET | `/api/carts/:userId` | Get user's cart (populated with items.product) |
| POST | `/api/carts` | Add product to cart (or update quantity) |
| DELETE | `/api/carts/:userId/:productId` | Remove item from cart |

**POST Body:**
```json
{
  "userId": "...",
  "productId": "...",
  "quantity": 1
}
```

---

# Models Schema

## Product
| Field | Type | Required | Default |
| --- | --- | --- | --- |
| title | String | Yes | - |
| description | String | No | "" |
| price | Number | Yes | - |
| oldPrice | Number | No | 0 |
| image | String | Yes | - |
| rating | Number | No | 0 |
| reviewsCount | Number | No | 0 |
| stock | Number | No | 0 |

## User
| Field | Type | Required | Unique |
| --- | --- | --- | --- |
| username | String | Yes | Yes |
| email | String | Yes | Yes |
| password | String | Yes | No |

## Comment
| Field | Type | Required | Ref |
| --- | --- | --- | --- |
| user | ObjectId | Yes | User |
| product | ObjectId | Yes | Product |
| text | String | Yes | - |
| rating | Number | Yes | - |

## Favorite
| Field | Type | Required | Ref |
| --- | --- | --- | --- |
| user | ObjectId | Yes | User |
| products | [ObjectId] | No | Product |

## Cart
| Field | Type | Required | Ref |
| --- | --- | --- | --- |
| user | ObjectId | Yes | User |
| items | Array | No | - |
| items[].product | ObjectId | Yes | Product |
| items[].quantity | Number | No | 1 |
