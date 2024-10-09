const router = require('express').Router();
const Complaint = require('../../models/Iresha/complaints.js');
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..','..', 'uploads'));  
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

// File filter for image types
const fileFilter = (req, file, cb) => {
  const fileTypes = /png|jpg|jpeg/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Only .png, .jpg, and .jpeg files are allowed!');
  }
};

// Multer upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },  
  fileFilter: fileFilter
});

// Generate a reference number
const generateReferenceNo = () => {
  return 'REF-' + Math.floor(Math.random() * 1000000).toString();
};

// Add a new complaint
router.post('/add', upload.single('attachment'), (req, res) => {
  const referenceNo = generateReferenceNo();
  const { username,  email, contactNo, subject, description } = req.body;
  const attachment = req.file ? req.file.filename : null;  

  const newComplaint = new Complaint({
      referenceNo,
      username,
      email,
      contactNo,
      subject,
      description,
      attachment,  
      status: 'pending'  
  });

  newComplaint.save()
      .then(() => res.json("Complaint Added"))
      .catch(err => res.status(400).json('Error: ' + err));
});

// Get all complaints 
router.get('/display', (req, res) => {
  Complaint.find()
    .then(complaints => res.json(complaints))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get pending complaints
router.get('/pending', (req, res) => {
  Complaint.find({ status: 'pending' })
    .then(complaints => res.json(complaints))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get completed complaints
router.get('/completed', (req, res) => {
  Complaint.find({ status: 'completed' })
    .then(complaints => res.json(complaints))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get one complaint by ID
router.get("/get/:id", async (req, res) => {
  let complaintId = req.params.id;
  try {
    const complaint = await Complaint.findById(complaintId);
    res.status(200).send({ status: "Complaint Fetched", complaint });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error fetching complaint", error: err.message });
  }
});

// Update a complaint by ID
router.put('/update/:id', upload.single('attachment'), (req, res) => {
  let complaintId = req.params.id;
  const { username, email, contactNo, subject, description } = req.body;
  const attachment = req.file ? req.file.filename : undefined; 

  const updateComplaint = {
      username,
      
      email,
      contactNo,
      subject,
      description,
      ...(attachment && { attachment })  
  };

  Complaint.findByIdAndUpdate(complaintId, updateComplaint, { new: true })
      .then(() => res.json("Complaint updated"))
      .catch(err => res.status(400).json('Error: ' + err));
});


// Delete a complaint by ID
router.delete('/delete/:id', (req, res) => {
  let complaintId = req.params.id;

  Complaint.findByIdAndDelete(complaintId)
    .then(() => res.json("Complaint Deleted"))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Admin reply to a complaint
router.post('/admin/reply/:id', async (req, res) => {
  let complaintId = req.params.id;
  const { reply } = req.body;

  try {
    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status: 'completed', adminReply: reply },  
      { new: true }
    );
    res.status(200).send({ status: "Reply added and complaint marked as completed", complaint });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error replying to complaint", error: err.message });
  }
});

module.exports = router;
