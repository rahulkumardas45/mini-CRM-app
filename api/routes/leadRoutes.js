import express from "express";
import {
  createLead,
  getLeadsByCustomer,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// -------------------------------
// Lead Routes (Nested under Customer)
// -------------------------------

// @route   POST /api/customers/:customerId/leads
// @desc    Create a new lead for a customer
router.post("/:customerId/leads", authenticate, createLead);

// @route   GET /api/customers/:customerId/leads
// @desc    Get all leads for a customer
router.get("/:customerId/leads", authenticate, getLeadsByCustomer);

// @route   GET /api/customers/:customerId/leads/:leadId
// @desc    Get a single lead
router.get("/:customerId/leads/:leadId", authenticate, getLeadById);

// @route   PUT /api/customers/:customerId/leads/:leadId
// @desc    Update a lead
router.put("/:customerId/leads/:leadId", authenticate, updateLead);

// @route   DELETE /api/customers/:customerId/leads/:leadId
// @desc    Delete a lead
router.delete("/:customerId/leads/:leadId", authenticate, deleteLead);

export default router;
