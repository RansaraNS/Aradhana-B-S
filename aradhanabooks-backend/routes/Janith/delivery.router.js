const express = require('express');
const router = express.Router();
const Rider = require('../../models/Janith/delivery.model.js');

// Fetch all riders or search by ID, name, or vehicle type
const getRiders = (req, res) => {
  const search = req.query.search || ""; 
  const searchRegex = new RegExp(search, "i"); 

  Rider.find({
    $or: [
      { id: searchRegex },
      { name: searchRegex },
      { vehicletype: searchRegex }
    ],
  })
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      console.error('Error fetching riders:', error);
      res.status(500).json({ message: 'Failed to fetch riders', error });
    });
};

// Add a new rider
const addRider = (req, res) => {
  const { id, name, telephone, email, vehicletype, licensetype } = req.body;

  const rider = new Rider({
    id,
    name,
    telephone,
    email,
    vehicletype,
    licensetype,
    assignedTasks: 0 // Initialize task count to 0 for new riders
  });

  rider
    .save()
    .then((response) => {
      res.json({ message: 'Rider added successfully', response });
    })
    .catch((error) => {
      console.error('Error adding rider:', error);
      res.status(500).json({ message: 'Failed to add rider', error });
    });
};

// Delete a rider
const deleteRider = (req, res) => {
  const id = req.body.id;
  Rider.deleteOne({ id: id })
    .then((response) => {
      if (response.deletedCount > 0) {
        res.json({ message: 'Rider deleted successfully', response });
      } else {
        res.status(404).json({ message: 'Rider not found' });
      }
    })
    .catch((error) => {
      console.error('Error deleting rider:', error);
      res.status(500).json({ message: 'Failed to delete rider', error });
    });
};

// Update a rider
const updateRider = (req, res) => {
  const { id, name, telephone, email, vehicletype, licensetype } = req.body;

  Rider.findOneAndUpdate(
    { id: id },
    { $set: { name, telephone, email, vehicletype, licensetype } },
    { new: true }
  )
    .then((response) => {
      if (response) {
        res.json({ message: 'Rider updated successfully', response });
      } else {
        res.status(404).json({ message: 'Rider not found' });
      }
    })
    .catch((error) => {
      console.error('Error updating rider:', error);
      res.status(500).json({ message: 'Failed to update rider', error });
    });
};

// Update task count for a rider
const updateTaskCount = (req, res) => {
  const { id } = req.params;
  const { assignedTasks } = req.body;

  Rider.findOneAndUpdate(
    { id },
    { $set: { assignedTasks } },
    { new: true }
  )
    .then((response) => {
      if (response) {
        res.json({ message: 'Task count updated successfully', response });
      } else {
        res.status(404).json({ message: 'Rider not found' });
      }
    })
    .catch((error) => {
      console.error('Error updating task count:', error);
      res.status(500).json({ message: 'Failed to update task count', error });
    });
};

// Fetch task count for a specific rider
const getTaskCount = (req, res) => {
  const { id } = req.params;

  Rider.findOne({ id })
    .then((rider) => {
      if (rider) {
        res.json({ assignedTasks: rider.assignedTasks });
      } else {
        res.status(404).json({ message: 'Rider not found' });
      }
    })
    .catch((error) => {
      console.error('Error fetching task count:', error);
      res.status(500).json({ message: 'Failed to fetch task count', error });
    });
};

// Define the routes
router.get('/riders', getRiders);
router.post('/createrider', addRider);
router.post('/updaterider', updateRider);
router.post('/deleterider', deleteRider);
router.put('/riders/:id/tasks', updateTaskCount); // Route for updating task count
router.get('/riders/:id/tasks', getTaskCount); // New route for fetching task count

module.exports = router;
