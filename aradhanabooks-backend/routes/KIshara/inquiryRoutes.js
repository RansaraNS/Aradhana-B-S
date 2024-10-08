const express = require("express");
const Inquiry = require("../../models/KIshara/Inquiry"); // Import the Inquiry model
const router = express.Router();

// POST request to create a new inquiry
router.post("/inquiries", async (req, res) => {
  const { orderId, customerName, contactNumber, inquiryType, description } = req.body;

  // Validate incoming data
  if (!orderId || !customerName || !contactNumber || !inquiryType || !description) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create a new inquiry
    const newInquiry = new Inquiry({
      orderId,
      customerName,
      contactNumber,
      inquiryType,
      description,
    });

    // Save the inquiry to the database
    await newInquiry.save();
    
    return res.status(201).json({ message: "Inquiry submitted successfully.", inquiry: newInquiry });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// GET request to retrieve all inquiries
router.get("/inquiries", async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    return res.status(200).json(inquiries);
  } catch (error) {
    console.error("Error retrieving inquiries:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// GET request to retrieve a single inquiry by ID
router.get("/inquiries/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const inquiry = await Inquiry.findById(id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found." });
    }
    return res.status(200).json(inquiry);
  } catch (error) {
    console.error("Error retrieving inquiry:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// PUT request to update an inquiry by ID
router.put("/inquiries/:id", async (req, res) => {
  const { id } = req.params;
  const { orderId, customerName, contactNumber, inquiryType, description } = req.body;

  try {
    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      id,
      { orderId, customerName, contactNumber, inquiryType, description },
      { new: true, runValidators: true }
    );

    if (!updatedInquiry) {
      return res.status(404).json({ message: "Inquiry not found." });
    }

    return res.status(200).json({ message: "Inquiry updated successfully.", inquiry: updatedInquiry });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// DELETE request to remove an inquiry by ID
router.delete("/inquiries/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedInquiry = await Inquiry.findByIdAndDelete(id);
    if (!deletedInquiry) {
      return res.status(404).json({ message: "Inquiry not found." });
    }
    return res.status(200).json({ message: "Inquiry deleted successfully." });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Export the router
module.exports = router;
