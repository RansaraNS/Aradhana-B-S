const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
  referenceNo: {
    type: String,
    unique: true,
    default: () => 'REF-' + Math.floor(Math.random() * 1000000).toString()  
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contactNo: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  attachment: {
    type: String,  
    
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'  
  },
  adminReply: {
    type: String,
    default: ''  
  }
}, { 
  timestamps: true  
});

 
const Complaint = mongoose.model('complaints', ComplaintSchema);

module.exports = Complaint;
