const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'));
router.use('/professional', require('./professional'));

module.exports = router;