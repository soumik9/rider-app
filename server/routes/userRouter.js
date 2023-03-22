const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
const verifyLogin = require("../middleware/verifyLogin");

//routes
router.get('/users', verifyLogin, UserController.getUsers);
router.post('/block-users', verifyLogin, UserController.blockUsers);

module.exports = router;