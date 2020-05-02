const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    es_indexed: true,
  },
  last_name: {
    type: String,
    required: true,
    es_indexed: true,
  },
  email: {
    type: String,
    required: true,
    es_indexed: true,
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
    es_indexed: true,
  },
  userlink: {
    type: String,
    default: "",
  },
  friend: [
    {
      id: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
    },
  ],
  notification: [
    {
      id: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
  get_friend: {
    type: [String],
    default: [],
  },
  number_friend: {
    type: Number,
    default: 0,
  },
});

UserSchema.plugin(mongoosastic);

module.exports = mongoose.model("user", UserSchema);
