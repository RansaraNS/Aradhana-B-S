const mongoose = require('mongoose');

const LoyaltyDiscountSchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  conditionAmount: {
    type: Number, // The minimum total amount required for the discount
    required: true,
  },
  discountPercentage: {
    type: Number, // Discount percentage for the package
    required: true,
  },
});

const LoyaltyDiscount = mongoose.model('LoyaltyDiscount', LoyaltyDiscountSchema);
module.exports = LoyaltyDiscount;
