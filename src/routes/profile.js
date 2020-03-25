const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const User = require('../models/user');
const asyncHandler = require('../utils/async-handler');
const logger = require('../logger');

const router = express.Router();

AWS.config.region = 'ap-south-1';
AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'questions-game-storage',
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});

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
      normalPhoto: req.files.normalPhoto[0].location,
      psychPhoto: req.files.psychPhoto[0].location,
    });
    await user.save();
    res.status(200).json(user);
    return next;
  }),
);

module.exports = router;
