const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');
const verifyLogin = require("../middleware/verifyLogin");
const upload = require("../middleware/upload");

//routes
router.get('/profile', verifyLogin, AuthController.profile);

router.post('/user/signup', upload.fields([
    { name: 'img', maxCount: 1 },
    { name: 'dlImg', maxCount: 1 },
    { name: 'nid', maxCount: 1 },
]), AuthController.signup);

router.post('/login', AuthController.login);



module.exports = router;