const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

// Helper to check for valid MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// 1. GET /items - Fetch all records
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving products',
      error: error.message
    });
  }
});

// 2. GET /items/:id - Fetch one by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with ID: ${id}`
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving product',
      error: error.message
    });
  }
});

// 3. POST /items - Create a new record
router.post('/', async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    // Manual validation helper for missing fields
    if (!name || price === undefined || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, price, and category'
      });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: savedProduct
    });
  } catch (error) {
    // Check for Mongoose validation error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error creating product',
      error: error.message
    });
  }
});

// 4. PUT /items/:id - Update a record
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, stock } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }
    // Find and update the product, run validators to ensure schema compliance
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, category, stock },
      { returnDocument: 'after', runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: `Product not found with ID: ${id}`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error updating product',
      error: error.message
    });
  }
});

// 5. DELETE /items/:id - Delete a record
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: `Product not found with ID: ${id}`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting product',
      error: error.message
    });
  }
});

module.exports = router;
