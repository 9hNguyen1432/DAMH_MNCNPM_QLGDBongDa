const Match = require('../models/Match');
const path = require('path')
const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: path.join(__dirname, '../public/uploads/imgs')});
const mo = require("../models/managerClub");
const Club = require('../models/club')
const uploadImage = require('../models/uploadImage')
const rules = require('../models/rules');
const { title } = require('process');
const util =require('../models/util');
const { runInContext } = require('vm');


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

        const rule = await rules.getRulesFromDataBase();
        var user = req.session.user
        console.log(rule);
        let arr = [];
        arr.push(rule.priorityToRank.p1)
        arr.push(rule.priorityToRank.p2)
        arr.push(rule.priorityToRank.p3)
        arr.push(rule.priorityToRank.p4)
        res.render('chinhsuaquydinh',{user,rule, arrRule:arr})
    }


    async updateRules(req, res){
        
        let priorityRank = req.body.other;
        var temp = util.unserialize(req.body.form);
        let alert =[];
        let cstAge = false;
        let cstNum = false;
        let cstGoal = false;
        let isValid = false;
        if(temp.minPlayer < temp.maxAge){
            cstAge = true;
        }
        else{alert.push("Tuổi tối đa không được nhỏ hơn tuổi tối thiểu\n")}
        if(temp.minPlayer < temp.maxPlayer){
            cstNum = true;
        }        
        else{alert.push("Số cầu thủ tối đa không được nhỏ hơn số cầu thủ tối thiểu\n")}
        if(temp.win > temp.draw && temp.draw > temp.lost){
            cstGoal = true;
        }        
        else{alert.push("Điểm các trạng thái thắng, thua, hòa không hợp lệ.\n")}

        isValid = cstAge && cstGoal && cstNum;
        if (isValid){
            alert.push("Thay đổi quy định thành công.\n")
        var rule = new rules.constructor(parseInt(temp.minAge), parseInt(temp.maxAge),parseInt(temp.foreignerPlayer),
        parseInt(temp.minPlayer),parseInt(temp.maxPlayer),parseInt(temp.maxTimeGoal),
        temp.typeOfGoal,{'win':parseInt(temp.win),'draw':parseInt(temp.draw),'lost':parseInt(temp.lost)},
            {'p1':priorityRank[0].trim(),'p2':priorityRank[1].trim(),'p3':priorityRank[2].trim(),'p4':priorityRank[3].trim()})
        
        await rule.addRule(rule)
        }
        else{alert.push("Thay đổi quy định thất bại.")}
        return res.send(alert);
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
            var logo = uploadImage(req.files.logo[0]);
            var name = req.body.tenclb;
            var stadium = req.body.sannha;
            var listPlayer = validedData.listPlayerValid
            var coach = req.body.hlv
            var captain = ""
            var club11 = new Club.constructor(id,logo,name, stadium, listPlayer,coach,captain)
            await Club.addClub(club11);
            res.render('dangkygiaidau',{user, clb, sannha, hlv, success})
        }

        }
        catch(err){
            console.log(err)
            res.render('dangkygiaidau',{user})
        }

    }



    async getCapNhaptiso(req, res){
        const Matchs = await Match.getMatchisRunning();
        var title = "CÁC TRẬN ĐANG DIỄN RA"
        var user = req.session.user
        res.render('ketquacactrandau', {user,AllMatchs: Matchs, title});
    }



    async postCapNhaptiso(req,res, next){
        let matchID = req.body.match;
        let typeGoal = req.body.loaibanthang.trim();
        let player = req.body.cauthughiban.trim();
        let time = req.body.thoigianghiban;
        let clb = req.body.clb;
        let report ="Bàn thắng: "+ player + " - " + typeGoal +" ("+ time +"')";
        
        await Match.updateMatchIsRunning()

        await Match.updateScoreInTime(matchID, clb, report);

        
        let match = await Match.findMatchByID(matchID);
        const club1 = await Club.getClubByName(match.club_1);
        const club2 = await Club.getClubByName(match.club_2);
        const rule = await rules.getRulesFromDataBase();
 
        var user = req.session.user
        res.render('capnhaptiso', {user, match, club1, club2, rule});
    }

    
}

module.exports = new manageController;