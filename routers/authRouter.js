const express = require('express')
const router = express.Router()
const authController = require('../controllers/authControllers')
const { isAuthenticated } = require('../middlewares/auth')


router.post('/login',authController.logIn);
router.get('/login',isAuthenticated,authController.ShowPagelogin);
router.post('/register',authController.register);
router.get('/register',isAuthenticated,authController.ShowPageRegister);
router.get('/logout',authController.logout);

module.exports = router