# Standalone Express + MongoDB CRUD API

A standalone, production-ready backend built with **Node.js, Express, and Mongoose (MongoDB)**. This API performs full CRUD (Create, Read, Update, Delete) operations on a `Product` resource with robust validation, proper HTTP status codes, and an organized MVC-like project structure.

---

## 📂 Project Structure

```
.
├── models/
│   └── product.js                 # Mongoose schema and model for Product
├── routes/
│   └── productRoutes.js           # API route handlers (GET, POST, PUT, DELETE)
├── postman/
│   ├── postman_collection.json    # Importable Postman Collection
│   └── screenshots/               # Pre-captured route success screenshots
│       ├── 1_get_all_products.png
│       ├── 2_get_product_by_id.png
│       ├── 3_create_product.png
│       ├── 4_update_product.png
│       └── 5_delete_product.png
├── tests/
│   ├── api_test.js                # Integration testing script
│   ├── mock_postman.html          # Screenshot generation page
│   └── capture_screenshots.js     # Edge screenshot automation script
├── .env.example                   # Environment template file
├── .gitignore                     # Git ignore rules
├── package.json                   # Project npm dependencies and scripts
└── server.js                      # Application main entry point
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Before running the application, make sure you have installed:
- **Node.js** (v18 or higher recommended)
- **MongoDB** (Ensure the local MongoDB Server service is running on your machine)

---

### ⚙️ Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone <your-repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**
   Install the necessary packages:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory (you can copy `.env.example` as a template):
   ```bash
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/product_db
   ```

4. **Run the Server**
   Start the server in Development mode with hot-reloading (via nodemon):
   ```bash
   npm run dev
   ```
   Or run the server in standard production mode:
   ```bash
   npm start
   ```

---

## 🔌 API Endpoints & Routes

All routes are prefixed with `/items`. Below are the 5 routes built for the `Product` resource:

| HTTP Method | Route | Description | Expected Status Codes | Request Body Schema (JSON) |
|---|---|---|---|---|
| **GET** | `/items` | Fetch all products sorted by newest | `200 OK`, `500 Server Error` | *None* |
| **GET** | `/items/:id` | Fetch a single product by MongoDB ID | `200 OK`, `404 Not Found`, `400 Bad Request`, `500` | *None* |
| **POST** | `/items` | Create a new product | `201 Created`, `400 Bad Request`, `500` | `{ "name": String, "price": Number, "category": String, "description": String, "stock": Number }` |
| **PUT** | `/items/:id` | Update an existing product | `200 OK`, `404 Not Found`, `400 Bad Request`, `500` | Same as POST (optional fields) |
| **DELETE** | `/items/:id` | Delete a product by ID | `200 OK`, `404 Not Found`, `400 Bad Request`, `500` | *None* |

---

## 🧪 Testing the API

### Option A: Automated Integration Tests (Recommended)
This project includes a custom, zero-dependency integration test suite that spawns the server, tests all 5 CRUD routes sequentially in a sandboxed environment, verifies response structures, asserts status codes, and clean-shuts the server.

To run it:
```bash
node tests/api_test.js
```

### Option B: Postman / Thunder Client
An export of the Postman Collection is provided inside the `postman/` directory:
- [postman_collection.json](postman/postman_collection.json)

**How to Import & Test:**
1. Open Postman.
2. Click **Import** in the top left and select `postman_collection.json`.
3. Start your server locally: `npm run dev`.
4. Run the requests in order. 
   > **Note:** For the requests targeting `:id` (`Get Product By ID`, `Update Product`, and `Delete Product`), make sure to replace the `{{PRODUCT_ID}}` variable or path parameter with a valid `_id` returned from your `Create Product` or `Get All Products` request.

---

## 🖼️ Postman Screenshots
Successful API responses for each of the 5 routes have been saved as high-resolution screenshots in the following paths:
1. **GET All Products:** `postman/screenshots/1_get_all_products.png`
2. **GET Product by ID:** `postman/screenshots/2_get_product_by_id.png`
3. **POST Create Product:** `postman/screenshots/3_create_product.png`
4. **PUT Update Product:** `postman/screenshots/4_update_product.png`
5. **DELETE Product:** `postman/screenshots/5_delete_product.png`
