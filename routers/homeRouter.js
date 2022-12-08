const express = require('express')
const router = express.Router()
const homePageController = require('../controllers/HomeController')


router.get('/',homePageController.index)


module.exports = router