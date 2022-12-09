const express = require('express')
const router = express.Router()
const manageController = require('../controllers/manageController')


router.get('/register-club', manageController.renderRClub);
router.get('/create-league',manageController.renderCreateLeauge);
router.get('/edit-regulations', manageController.renderEditReg);

router.get('/', manageController.index)

module.exports = router;