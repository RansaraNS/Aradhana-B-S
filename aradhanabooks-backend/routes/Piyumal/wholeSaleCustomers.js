const express = require("express");
const router = express.Router();
const Wholesalecus = require("../../models/Piyumal/Wholesalecus.js");
const sendEmail = require("../../mailer.js"); // Import the mailer


// Confirm Customer Request and send an email
router.post("/confirmRequest/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Wholesalecus.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer Request not found" });
    }

    // Send an email to the customer
    sendEmail(
      customer.customeremail,
      "Request Confirmation",
      `Hello ${customer.customername}, your request has been confirmed!`
    );

    res.json({ message: "Request confirmed and email sent!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Create part
// http://localhost:2001/wcustomer/addRequest -> postman check
router.post("/addRequest", (req, res) => {
  const {
    customername,
    customeremail,
    customerphone,
    companyName,
    customeraddress,
    description
  } = req.body;

  const newCustomer = new Wholesalecus({
    customername,
    customeremail,
    customerphone,
    companyName,
    customeraddress,
    description 
  });

  newCustomer
    .save()
    .then(() => res.json("Request Added"))
    .catch((err) => console.log(err));
});

// Retrieve all customer details
// http://localhost:2001/wcustomer/getAll -> postman check
router.get("/getAll", async (req, res) => {
  try {
    const customers = await Wholesalecus.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update all customer details
// http://localhost:2001/wcustomer/update/:id -> postman check
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    customername,
    customeremail,
    customerphone,
    companyName,
    customeraddress,
    description
  } = req.body;

  try {
    const updateData = {
      customername,
      customeremail,
      customerphone,
      companyName,
      customeraddress,
      description // Add description here
    };

    const updatedCustomer = await Wholesalecus.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Customer Request
// http://localhost:2001/wcustomer/delete/:id -> postman check 
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCustomer = await Wholesalecus.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single customer detail by ID
// http://localhost:2001/wcustomer/get/:id -> postman
router.get("/get/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Wholesalecus.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer Request not found" });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
