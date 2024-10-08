const router = require('express').Router();
const Address = require('../../models/Ishara/address.model');

// Create new address - 1 only
router.post('/', async (req, res) => {
  const newAddress = new Address(req.body);
  try {
    const savedAddress = await newAddress.save();
    res.json(savedAddress);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

// Get all addresses
router.get('/', async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

// Update address  - 1 only          //async - promise eka enkn innwa
router.put('/:id', async (req, res) => {
  try {                    //await - update ek iwara wela iwr wenkn inn 
    const updatedAddress = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAddress);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

// Delete address - 1 only
router.delete('/:id', async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.json('Address deleted');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
