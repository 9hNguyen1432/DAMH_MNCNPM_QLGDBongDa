const express = require('express')
const router = express.Router()
const detailClubController = require('../controllers/detailClubController')


router.get('/:name', detailClubController.index)

module.exports = router;