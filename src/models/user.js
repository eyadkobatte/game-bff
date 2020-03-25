const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: String,
    nickName: String,
    normalPhoto: String,
    psychPhoto: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model('user', userSchema);

module.exports = User;
