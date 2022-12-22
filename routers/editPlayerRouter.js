const express = require('express')
const router = express.Router()
const editPlayerController = require('../controllers/editPlayerController')
const path = require('path')
// const multer = require('../config/multer')
var multer = require('multer')
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.post('/:id',upload.single("avt"), editPlayerController.editPlayer)
router.get('/:id', editPlayerController.index)

module.exports = router;