const express = require('express');

const { sendMessage,getMessages } = require('../controllers/message.controller');
const protectedRoute = require('../middlewares/protectedRoute');

const router = express.Router();

router.post('/send/:id', protectedRoute, sendMessage)

router.get('/:id', protectedRoute, getMessages)

module.exports = router;