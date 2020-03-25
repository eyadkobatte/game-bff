const express = require('express');

const router = express.Router();

router.post('/register', (req, res, next) => {
  const { username, nickname } = req.body;
  res.status(200).json({ username, nickname });
  return next;
});

module.exports = router;
