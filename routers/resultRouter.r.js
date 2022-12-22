const express = require('express')
const router = express.Router()
const resultController = require('../controllers/resultController')


router.get('/', resultController.index)
router.get('/:id', resultController.renderResultDetail)


module.exports = router;