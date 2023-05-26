const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    user_id: { type: String },
    user_email: { type: String },
    user_phone_number: { type: String },
    user_type: { type: String, enum: ["user", "admin"] },
    wallet_pin: { type: String },
    pending_clearance: { type: Number, default: 0 },
    available_balance: { type: Number, default: 0 },
    withdraw_frequency: { type: Number },
    withdraw_limit: { type: Number },
    is_blocked: { tye: Boolean, default: false },
    is_flagged: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Wallet", schema);
