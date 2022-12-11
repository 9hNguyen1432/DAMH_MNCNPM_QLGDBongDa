const Match = require('../models/Match')
const Club = require('../models/Club')


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
        var obj = {author: true}
        res.render('dangkygiaidau',obj)
    }

    async registerClub(req, res)
    {
       
        const file = req.file;
        const url = await Club.uploadLogo(file)
        console.log(url)
    }
    renderCreateLeauge(req, res){
        var obj = {author: true}
        res.render('taogiaidaumoi',obj)
    }
    renderEditReg(req, res){
        var obj = {author: true}
        res.render('chinhsuaquydinh',obj)
    }
}

module.exports = new manageController;