const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    category: { type: String },
    stockQuantity: { type: Number, default: 20 },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
