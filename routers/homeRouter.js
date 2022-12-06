const express = require('express')
const router = express.Router()
const isAuthenticated  = require('../middlewares/home')
const homePageController = require('../controllers/HomeController')


router.get('/',isAuthenticated,homePageController.index)


module.exports = router