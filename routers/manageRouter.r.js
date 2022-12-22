const express = require('express')
const router = express.Router()
const manageController = require('../controllers/manageController')
const {notAdmin, isAdmin} = require('../middlewares/home')
const multer = require("multer");
const path = require('path')
//const multer = require('../config/multer')

const Multer = multer({
    storage: multer.memoryStorage(),
    limits:1024*1024,
  })



router.get('/',notAdmin, manageController.index)
router.get('/register-club',notAdmin, manageController.renderRClub);
router.get('/create-league',notAdmin,manageController.renderCreateLeauge);
router.get('/edit-regulations',notAdmin, manageController.renderEditReg);
//router.post('/register-club', _multer.upload.fields([{name: "danhsachcauthu"}]), manageController.uploadClub);

router.post('/register-club',Multer.single("logo") , manageController.uploadClub);





module.exports = router;