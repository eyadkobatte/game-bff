const express = require('express');
const multer = require('multer');

const logger = require('../logger');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post(
  '/register',
  upload.fields([
    { name: 'normalPhoto', maxCount: 1 },
    { name: 'psychPhoto', maxCount: 1 },
  ]),
  (req, res, next) => {
    const { username, nickname } = req.body;
    logger.info({ normalPhoto: req.files.normalPhoto });
    res.status(200).json({ username, nickname });
    return next;
  },
);

module.exports = router;
