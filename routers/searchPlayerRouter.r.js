const express = require('express')
const router = express.Router()
const searchPlayerController = require('../controllers/SearchPlayerController')


router.get('/', searchPlayerController.index)
router.post('/', searchPlayerController.index)

module.exports = router;