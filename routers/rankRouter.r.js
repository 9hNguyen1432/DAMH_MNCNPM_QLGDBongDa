const express = require('express')
const router = express.Router()
const rankController = require('../controllers/RankController')


router.get('/', rankController.index)

module.exports = router;