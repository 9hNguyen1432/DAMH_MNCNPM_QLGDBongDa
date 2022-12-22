const Match = require('../models/Match');
const path = require('path')
const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: path.join(__dirname, '../public/uploads/imgs')});
const mo = require("../models/managerClub");
const Club = require('../models/club')
const uploadImage = require('../models/uploadImage')
const rules = require('../models/rules')


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
    renderEditReg(req, res){
        var user = req.session.user
        res.render('chinhsuaquydinh',{user})
    }

    async uploadClub(req,res,next){
        // console.log(req.files)
        var user = req.session.user
        try{
        // console.log(req.file.destination);
        // if(req.file){
        //     return res.render('dangkygiaidau', { user,
        //         imgPath: '/uploads/logo/' + req.file.filename ,
        //         imgName: req.file.originalname
        //     });
        // }

        var rule = rules.getRulesFromDataBase();
        var temp = await mo.CSVFiletoJsonObject(req.files.danhsachcauthu[0].buffer.toString('utf8'))
        // var temp = await mo.CSVFiletoJsonObject(req.files.danhsachcauthu[0].path)
        var validedData = await mo.checkListPlayer(temp);
        var errors = [];
        var clb = req.body.tenclb;
        var sannha = req.body.sannha;
        var hlv = req.body.hlv;
        var success = false
        if (validedData.constrainForeignerPlayer == false){
            errors.push ("Số ngoại binh vượt quá số lượng cho phép")
            if(validedData.listPlayerInvalid.length !=0){
                for (let player of validedData.listPlayerInvalid){
                    errors.push("Thông tin cầu thủ "+ player.ten +" Không hợp lệ.");
                }
            }
            res.render('dangkygiaidau',{user, clb, sannha, hlv, errors})
        }
        else if (validedData.constrainNumOfPlayers == false){
            errors.push ("Tổng số cầu thủ đủ điều kiện đăng ký không hợp lệ (min: "+ rule.minPlayer +"; max: "+ rule.maxPlayer + ")")
            if(validedData.listPlayerInvalid.length !=0){
                for (let player of validedData.listPlayerInvalid){
                    errors.push("Thông tin cầu thủ "+ player.ten +" Không hợp lệ.");
                }
            }
            res.render('dangkygiaidau',{user, clb, sannha, hlv, errors})
        }

        else if (validedData.validListPlayer ==true){
            success = true
            var id = ""
            console.log(req.files);
            var logo = uploadImage(req);
            console.log(2);
            var name = req.body.tenclb;
            var stadium = req.body.sannha;
            var listPlayer = validedData.listPlayerValid
            var coach = req.body.hlv
            var captain = ""
            var club11 = new Club.constructor(id,logo,name, stadium, listPlayer,coach,captain)
            await Club.addClub(club11);
            console.log(club11)
            res.render('dangkygiaidau',{user, clb, sannha, hlv, success})
        }




        }
        catch(err){
            console.log(err)
            res.render('dangkygiaidau',{user})
        }

    }






    async renderCapNhaptiso(req,res){
        const match = await Match.getMatchisRunning();

        const club1 = await Club.getClubByName(match[0].club_1);
        const club2 = await Club.getClubByName(match[0].club_2);
        const rule = await rules.getRulesFromDataBase();
        console.log(rule)
        var user = req.session.user
        res.render('capnhaptiso', {user, match: match[0], club1, club2, rule});
    }

    
}

module.exports = new manageController;