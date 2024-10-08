const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
});
                              //document name   //attributes
const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
