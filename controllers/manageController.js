const Match = require('../models/Match');
const path = require('path')
const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: path.join(__dirname, '../public/uploads/imgs')});
const mo = require("../models/managerClub");
const Club = require('../models/club')
const uploadImage = require('../models/uploadImage')


class manageController{
    async index(req,res){
        const date = await Match.getDateNotFinish();
        const today = date[0];
        const nextday = date[1];
        await Match.updateMatchIsRunning()

        const match1 = await Match.getMatchByDate(today)
        const match2 = await Match.getMatchByDate(nextday)

        var user = req.session.user
        
        res.render('giaodienchinh',{user,today,match1,nextday,match2})
    }
    
    renderRClub(req, res){

        var user = req.session.user
        res.render('dangkygiaidau',{user})
    }

    renderCreateLeauge(req, res){
        var user = req.session.user
        res.render('taogiaidaumoi',{user})
    }
    async renderEditReg(req, res){

        
        var user = req.session.user
        res.render('chinhsuaquydinh',{user})
    }

    async uploadClub(req,res,next){

    
        // console.log(req.file.destination);
        // if(req.file){
        //     return res.render('dangkygiaidau', { user,
        //         imgPath: '/uploads/logo/' + req.file.filename ,
        //         imgName: req.file.originalname
        //     });
        // }
      //  var temp = await mo.CSVFiletoJsonObject(req.files.danhsachcauthu[0].path)
       // var validedData = await mo.checkListPlayer(temp);
    
        if(req.file){
            const url = uploadImage(req);
            if(url)
                console.log(url)
                return res.render('dangkygiaidau', { 
                    imgPath: url,
                    imgName: req.file.originalname
                });

        }


        var user = req.session.user

        res.render('dangkygiaidau',{user})
    }

    
}

module.exports = new manageController;