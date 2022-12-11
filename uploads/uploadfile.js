
const path = __dirname + '/public/uploads/imgs';
const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: path });

const app = express()

exports.postUpload   = async (req,res,next) => {
    if(req.file){
        return res.render('/manage/upload', {
            imgPath: '/uploads/imgs/' + req.file.filename ,
            imgName: req.file.originalname
        });
    }
    res.render('/')
}