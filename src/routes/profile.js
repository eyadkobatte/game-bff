const express = require('express');
const multer = require('multer');

const User = require('../models/user');
const asyncHandler = require('../utils/async-handler');
const logger = require('../logger');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post(
  '/register',
  upload.fields([
    { name: 'normalPhoto', maxCount: 1 },
    { name: 'psychPhoto', maxCount: 1 },
  ]),
  asyncHandler(async (req, res, next) => {
    const { username, nickname } = req.body;
    if (
      req.files.normalPhoto.length === 0 ||
      req.files.psychPhoto.length === 0
    ) {
      const errorMessage = 'Cannot find photo to register for profile';
      logger.error({ message: errorMessage });
      return next(new Error(errorMessage));
    }
    const user = new User({
      username,
      nickname,
      normalPhoto: req.files.normalPhoto[0].path,
      psychPhoto: req.files.psychPhoto[0].path,
    });
    await user.save();
    res.status(200).json(user);
    return next;
  }),
);

module.exports = router;
