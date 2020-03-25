const express = require('express');
const faker = require('faker');

const asyncHandler = require('../utils/async-handler');
const Game = require('../models/game');

const logger = require('../logger');

const router = express.Router();

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { username, cardDeckSelected } = req.body;
    // If the user already has a game running, send that game back, otherwise create a new game
    const existingGame = await Game.findOne({ adminUsername: username });
    if (existingGame) {
      logger.info({
        message: 'A game already exists with this user.',
        gameCode: existingGame.gameCode,
        username,
      });
      res.status(200).json(existingGame);
      return next;
    }
    // This user does not have a game created. Create new game
    const gameCode = faker.lorem.slug(2);
    const newGame = new Game({
      adminUsername: username,
      gameCode,
      usersInGame: [],
      cardDeckSelected,
    });
    await newGame.save();
    logger.info({
      message: 'New game created',
      gameCode: newGame.gameCode,
      username,
    });
    res.status(200).json(newGame);
    return next;
  }),
);

module.exports = router;
