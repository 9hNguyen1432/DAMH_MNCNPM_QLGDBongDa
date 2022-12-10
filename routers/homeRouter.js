const express = require('express')
const router = express.Router()
const homeController = require('../controllers/HomeController')
const {isAdmin} = require('../middlewares/home')


router.get('/',isAdmin,homeController.index)

module.exports = router;