const express = require('express')
const router = express.Router()
const detailPlayerController = require('../controllers/detailPlayerController')


router.get('/:id', detailPlayerController.index)

module.exports = router;