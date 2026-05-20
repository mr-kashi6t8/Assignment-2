require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/product_db';

// 1. Body Parser Middleware
app.use(express.json());

// 2. Logging Middleware (optional but helpful for debug/test)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 3. Welcome / Root Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the standalone Express + MongoDB CRUD API',
    endpoints: {
      getAll: 'GET /items',
      getOne: 'GET /items/:id',
      create: 'POST /items',
      update: 'PUT /items/:id',
      delete: 'DELETE /items/:id'
    }
  });
});

// 4. Register CRUD Routes
app.use('/items', productRoutes);

// 5. 404 Not Found Handling for unregistered routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// 6. Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred',
    error: err.message
  });
});

// 7. Database Connection and Server Startup
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully to:', MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} in development mode`);
      console.log(`Access API endpoints at http://localhost:${PORT}/items`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });
