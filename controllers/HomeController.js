const Match = require('../models/Match')
const rules = require('../models/rules')
const util = require('../models/util')

class HomePageController{
    async index(req,res){
        const date = await Match.getDateNotFinish();
        const today = date[0];
        const nextday = date[1];
        await Match.updateMatchIsRunning()

        var match1 = await Match.getMatchByDate(today)
        var match2 = await Match.getMatchByDate(nextday)
        match1 =await util.getLogoMatch(match1);
        match2 = await util.getLogoMatch(match2);
        var user = req.session.user
        res.render('giaodienchinh',{user,today,match1,nextday,match2})
    }
}

module.exports = new HomePageController;