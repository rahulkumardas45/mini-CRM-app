import Lead from "../models/Lead.js";
import Customer from "../models/Customer.js";

// @desc   Create a lead for a customer
// @route  POST /api/customers/:customerId/leads
// @access Private
export const createLead = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { title, description, status, value } = req.body;

    // check if customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const lead = new Lead({
      customerId,
      title,
      description,
      status,
      value,
    });

    await lead.save();

    res.status(201).json({ message: "Lead created ✅", lead });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

// @desc   Get all leads for a customer
// @route  GET /api/customers/:customerId/leads
// @access Private
export const getLeadsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    const leads = await Lead.find({ customerId }).sort({ createdAt: -1 });

    res.json(leads);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get a single lead
// @route  GET /api/customers/:customerId/leads/:leadId
// @access Private
export const getLeadById = async (req, res) => {
  try {
    const { customerId, leadId } = req.params;

    const lead = await Lead.findOne({ _id: leadId, customerId });
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Update a lead
// @route  PUT /api/customers/:customerId/leads/:leadId
// @access Private
export const updateLead = async (req, res) => {
  try {
    const { customerId, leadId } = req.params;
    const { title, description, status, value } = req.body;

    const lead = await Lead.findOne({ _id: leadId, customerId });
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead.title = title || lead.title;
    lead.description = description || lead.description;
    lead.status = status || lead.status;
    lead.value = value !== undefined ? value : lead.value;

    const updated = await lead.save();

    res.json({ message: "Lead updated ✅", lead: updated });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message:  err.message});
  }
};

// @desc   Delete a lead
// @route  DELETE /api/customers/:customerId/leads/:leadId
// @access Private
export const deleteLead = async (req, res) => {
  try {
    const { customerId, leadId } = req.params;

    const lead = await Lead.findOne({ _id: leadId, customerId });
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    await lead.deleteOne();

    res.json({ message: "Lead deleted ✅" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
