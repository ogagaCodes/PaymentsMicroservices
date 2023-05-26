const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    session_id: { type: String},
    session_token:{type: String},
    user_id: { type: String },
    email: { type: String },
    is_active:{ type: Boolean },
    lat: { type: Number },
    long: { type: Number },
    logged_in_time: { type: Number},
    logged_out_time: { type: Number },
    login_duration: { type: String },
    device_info: {type: Object},
    role: { type: String,
      enum: ["user"]
    },
  },
);

module.exports = mongoose.model("SessionLogs", schema);
