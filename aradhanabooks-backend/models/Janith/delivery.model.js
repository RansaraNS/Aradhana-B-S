const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Rider schema definition
const riderSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  telephone: { type: Number, required: true },
  email: { type: String, required: true },
  vehicletype: { type: String, required: true },
  licensetype: { type: String, required: true },
  assignedTasks: { type: Number, default: 0 } // New field to store task count
});

// Create the Rider model
const Rider = mongoose.model('Rider', riderSchema);

module.exports = Rider;

