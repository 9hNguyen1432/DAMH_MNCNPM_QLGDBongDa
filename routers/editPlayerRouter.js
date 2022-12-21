const express = require('express')
const router = express.Router()
const editPlayerController = require('../controllers/editPlayerController')


router.get('/:id', editPlayerController.index)

module.exports = router;