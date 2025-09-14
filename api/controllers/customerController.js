import Customer from "../models/Customer.js";

// @desc   Add new customer
// @route  POST /api/customers
// @access Private
export const addCustomer = async (req, res) => {
  try {
    const { name, email, phone, company } = req.body;

    // check duplicate email
    const exists = await Customer.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Customer with this email already exists" });
    }

    const customer = await Customer.create({
  name,
  email,
  phone,
  company,
  ownerId: req.user.id, // use the correct field name
});


    
    res.status(201).json({ message: "Customer created ✅", customer });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

// @desc   Get all customers (with pagination + search)
// @route  GET /api/customers
// @access Private
export const getCustomers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    const customers = await Customer.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Customer.countDocuments(query);

    res.json({
      customers,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get single customer details
// @route  GET /api/customers/:id
// @access Private
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Update customer
// @route  PUT /api/customers/:id
// @access Private
export const updateCustomer = async (req, res) => {
  try {
    const { name, email, phone, company } = req.body;

    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.phone = phone || customer.phone;
    customer.company = company || customer.company;

    const updated = await customer.save();
    res.json({ message: "Customer updated ✅", customer: updated });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Delete customer
// @route  DELETE /api/customers/:id
// @access Private
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await customer.deleteOne();
    res.json({ message: "Customer deleted ✅" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
