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
  },
);

const User = mongoose.Model('User', userSchema);

module.exports = User;
