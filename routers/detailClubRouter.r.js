const express = require('express')
const router = express.Router()
const detailClubController = require('../controllers/detailClubController')
const playersOfClubController = require('../controllers/playersOfClubController')

router.get('/players-of-club/:nameclub',playersOfClubController.index)
router.get('/:name', detailClubController.index)

module.exports = router;