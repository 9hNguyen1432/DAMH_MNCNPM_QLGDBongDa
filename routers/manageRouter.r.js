const express = require('express')
const router = express.Router()
const manageController = require('../controllers/manageController')
const {notAdmin} = require('../middlewares/home')

const path = require('path')
const multer  = require('multer');
const upload = multer({ dest: path.join(__dirname, '../public/uploads/imgs') });


router.get('/',notAdmin, manageController.index)
router.get('/register-club',notAdmin, manageController.renderRClub);
router.get('/create-league',notAdmin,manageController.renderCreateLeauge);
router.get('/edit-regulations',notAdmin, manageController.renderEditReg);
router.post('/register-club', upload.single("logo"), manageController.uploadClub);


module.exports = router;