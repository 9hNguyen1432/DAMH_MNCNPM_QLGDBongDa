const { findMatchByID } = require('../models/Match');
const Match = require('../models/Match')
const controllerManager = require('./manageController')
const Club = require('../models/club')
const rules = require('../models/rules')

class resultController{
    async index(req,res){
        const Matchs = await Match.getMatchisFinished();
        const title = "KẾT QUẢ";
        var user = req.session.user
        res.render('ketquacactrandau', {user,AllMatchs: Matchs, title});
    }
    async renderResultDetail(req, res, next){
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