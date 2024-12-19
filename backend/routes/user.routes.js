const express = require('express');
const protectedRoute = require('../middlewares/protectedRoute');
const getUsersForSidebar = require('../controllers/user.controller');
const router = express.Router();

router.get('/',protectedRoute, getUsersForSidebar);

module.exports = router;