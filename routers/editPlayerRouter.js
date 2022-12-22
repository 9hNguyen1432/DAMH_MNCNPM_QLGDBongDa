const express = require('express')
const router = express.Router()
const editPlayerController = require('../controllers/editPlayerController')

router.post('/:id', editPlayerController.editPlayer)
router.get('/:id', editPlayerController.index)

module.exports = router;