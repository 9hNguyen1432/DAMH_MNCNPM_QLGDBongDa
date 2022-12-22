const express = require('express')
const router = express.Router()
const manageController = require('../controllers/manageController')
const {notAdmin, isAdmin} = require('../middlewares/home')

const path = require('path')
// const multer = require('../config/multer')
var multer = require('multer')
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });


router.get('/',notAdmin, manageController.index)
router.get('/update-match', notAdmin, manageController.renderCapNhaptiso);
router.get('/register-club',notAdmin, manageController.renderRClub);
router.get('/create-league',notAdmin,manageController.renderCreateLeauge);
router.get('/edit-regulations',notAdmin, manageController.renderEditReg);
router.post('/register-club',upload.fields([{name: "logo"}, {name: "danhsachcauthu"}]), manageController.uploadClub);




module.exports = router;