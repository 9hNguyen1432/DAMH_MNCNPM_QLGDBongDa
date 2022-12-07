const express = require('express')
const router = express.Router()

const homePageController = require('../controllers/HomeController')


router.use('/', homePageController.index)


module.exports = router