const express = require('express')
const router = express.Router()
const resultController = require('../controllers/resultController')


router.get('/', resultController.index)

module.exports = router;