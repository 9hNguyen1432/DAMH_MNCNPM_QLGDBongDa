const Match = require('../models/Match')
const rules = require('../models/rules')

class HomePageController{
    async index(req,res){
        const date = await Match.getDateNotFinish();
        const today = date[0];
        const nextday = date[1];
        await Match.updateMatchIsRunning()

        const match1 = await Match.getMatchByDate(today)
        const match2 = await Match.getMatchByDate(nextday)

        var user = req.session.user
        console.log(match1)
        res.render('giaodienchinh',{user,today,match1,nextday,match2})
    }
}

module.exports = new HomePageController;