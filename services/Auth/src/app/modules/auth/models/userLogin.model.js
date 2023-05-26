const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    username: { type: String},
    first_name: {type: String},
    last_name: {type: String},
    user_id: { type: String},
    password: { type: String},
    email: { type: String},
    phone_number: { type: String},
    user_type: { type: String, enum: ["user"] },
    is_blocked: { type: Boolean, default: false},
    is_verified: { type: Boolean, default: false},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Login", schema);
