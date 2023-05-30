const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    user_id: { type: String },
    username:{type: String},
    amount: {type: Number, minumum: 0},
    start_deposit_date:{type: Date},
    end_deposit_date:{type: Date},
    plan: { type: String, enum: ['o-wealth', 'target'] },
    auto_deposit: { type: String, enum:['daily', 'weekly', 'monthly', 'yearly', 'rately'] },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("SavingsPlan", schema);
