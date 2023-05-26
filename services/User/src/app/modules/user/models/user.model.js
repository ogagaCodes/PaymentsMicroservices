const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    phone_number: { type: String, sparse: true },
    imei:{type: String},
    username: { type: String, sparse: true, default: "" },
    email: String,
    auth_type:{
      type: String,
      // lc= local auth; gg=google auth; fb=facebook auth; ap =apple auth
      enum: ["lc", "gg", "fb", "ap"],
    },
    image: String,
    cover_img: String,
    user_type: {
      type: String,
      enum: ["user"],
    },
    is_blocked:{type: Boolean},
    notification: { 
      push_notification: {
        type: Boolean,
        default: true,
      },
      SMS: {
        type: Boolean,
        default: true,
      },
      marketing_messages: {
        type: Boolean,
        default: true,
      },
      product_update: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("User", schema);
