const express = require('express')
const router = express.Router()
const searchPlayerController = require('../controllers/SearchPlayerController')


router.get('/', searchPlayerController.index)

module.exports = router;