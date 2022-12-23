const { findMatchByID } = require('../models/Match');
const Match = require('../models/Match')
const controllerManager = require('./manageController')
const Club = require('../models/club')
const rules = require('../models/rules')

class resultController{
    async index(req,res){
        const matchs = await Match.getMatchisFinished();
        let info =[];
        for (let i = 0; i< matchs.length; i++){
            let club1 = await Club.getClubByName(matchs[i].club_1);
            let club2 = await Club.getClubByName(matchs[i].club_2);
            let logos ={
                logo1: club1.logo,
                logo2: club2.logo,
            }
            info.push({
                match: matchs[i], logos
            })
        }
        const title = "KẾT QUẢ";
        var user = req.session.user
        res.render('ketquacactrandau', {user,AllMatchs: info, title});
    }
    async renderResultDetail(req, res, next){
        
        await Match.updateMatchIsRunning()
        let id = req.params.id;
        let match = await Match.findMatchByID(id);
        var user = req.session.user
        const club1 = await Club.getClubByName(match.club_1);
        const club2 = await Club.getClubByName(match.club_2);
        const rule = await rules.getRulesFromDataBase();

        res.render('capnhaptiso', {user, match, club1, club2, rule});
    }
}

module.exports = new resultController;