const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    gameCode: String,
    adminUsername: String,
    usersInGame: [String],
    cardDeckSelected: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Game = mongoose.model('game', gameSchema);

module.exports = Game;
