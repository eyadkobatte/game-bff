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

router.put(
  '/',
  asyncHandler(async (req, res, next) => {
    const { username, gameCode } = req.body;
    // Check if the game exists
    const game = await Game.findOne({ gameCode });
    if (!game) {
      // If no game exists with such code, throw an error
      const errorMessage = 'Could not find game';
      logger.error({ message: errorMessage, gameCode, username });
      return next(new Error(errorMessage));
    }
    if (game.usersInGame.includes(username)) {
      // If user already is in the game, throw an error
      const errorMessage = 'User already inside the game';
      logger.error({ message: errorMessage, gameCode, username });
      return next(new Error(errorMessage));
    }
    // Add the user to the lists and send back new game object
    game.usersInGame.push(username);
    await game.save();
    logger.info({ message: 'User added to game' });
    res.status(200).json(game);
    return next;
  }),
);

module.exports = router;
