import express from 'express';
import {
  addCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from '../controllers/customerController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

// @route   POST /api/customers
// @desc    Add new customer
// @access  Private
router.post('/add', authenticate, addCustomer);

// @route   GET /api/customers
// @desc    Get all customers (with pagination + search)
// @access  Private
router.get('/getcustomer', authenticate, getCustomers);

// @route   GET /api/customers/:id
// @desc    Get single customer
// @access  Private
router.get('/getcustomer/:id', authenticate, getCustomerById);

// @route   PUT /api/customers/:id
// @desc    Update customer
// @access  Private
router.put('/update/:id', authenticate, updateCustomer);

// @route   DELETE /api/customers/:id
// @desc    Delete customer
// @access  Private
router.delete('/delete/:id', authenticate, authorize(["Admin"]), deleteCustomer);

export default router;
