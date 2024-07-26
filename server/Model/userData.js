const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  mobile: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String, require: true, default: "user" },
});

module.exports = mongoose.model("users", userSchema);
