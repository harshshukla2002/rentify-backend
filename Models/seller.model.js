const mongoose = require("mongoose");

const SellerSchema = mongoose.Schema({
  address: { type: String, required: true },
  bedroom: { type: Number, required: true },
  bathroom: { type: Number, required: true },
  nearby: { type: String, required: true },
  seller: { type: Object, required: true },
  userId: { type: String, required: true },
  likes: { type: Number, required: true },
});

const SellerModel = mongoose.model("Seller", SellerSchema);

module.exports = { SellerModel };
