const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "custom"],
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  profile_image: {
    type: String,
    default: "",
  },
  intro: {
    type: [String],
    default: [],
  },
  check_mail: {
    type: Boolean,
    default: true,
  },
  username: {
    type: String,
    required: true,
  },
  userlink: {
    type: String,
    default: "",
  },
  friend: {
    type: [String],
    default: [],
  },
  send_friend: {
    type: [String],
    default: [],
  },
  notification: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("users", UserSchema);
