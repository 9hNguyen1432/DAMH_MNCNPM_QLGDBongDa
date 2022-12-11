const Match = require('../models/Match')


class resultController{
    async index(req,res){
        const date = await Match.getDateNotFinish();
        const today = date[0];
        const nextday = date[1];
        const nextNextDay = date[2];

        await Match.updateMatchIsRunning()

        const match1 = await Match.getMatchByDate(today)
        const match2 = await Match.getMatchByDate(nextday)
        const match3 = await Match.getMatchByDate(nextNextDay);
        var user = req.session.user;
        console.log(match1)
        res.render('danhsachtrandau',{user,today,match1,nextday,match2, nextNextDay, match3})

    }
}

module.exports = new resultController;