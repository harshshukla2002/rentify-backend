const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel };
