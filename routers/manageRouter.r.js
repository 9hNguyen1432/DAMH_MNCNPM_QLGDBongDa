const express = require('express')
const router = express.Router()
const manageController = require('../controllers/manageController')


router.get('/', manageController.index)
router.get('/register-club', manageController.renderRClub);
router.get('/create-league',manageController.renderCreateLeauge);
router.get('/edit-regulations', manageController.renderEditReg);



module.exports = router;