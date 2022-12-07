const express = require('express')
const router = express.Router()
const listClubsController = require('../controllers/ListClubsController')


router.get('/', listClubsController.index)

module.exports = router;