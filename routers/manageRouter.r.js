const express = require('express')
const router = express.Router()
const manageController = require('../controllers/manageController')
const {notAdmin} = require('../middlewares/home')



router.get('/',notAdmin, manageController.index)
router.get('/register-club',notAdmin, manageController.renderRClub);
router.get('/create-league',notAdmin,manageController.renderCreateLeauge);
router.get('/edit-regulations',notAdmin, manageController.renderEditReg);

router.post('/register-club',manageController.registerClub)


module.exports = router;