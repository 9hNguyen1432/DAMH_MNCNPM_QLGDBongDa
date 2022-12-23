
const util = require('../models/util')
const Match = require('../models/Match')


class scheduleController{

    async index(req,res){
        const allDate = await Match.getAllDate();
        const date = await Match.getDateNotFinish();
        var AllMatchs = []
        var Matchs = []

        await Promise.all(allDate.map(async d => {
            let match = await Match.getMatchByDate(d);
            AllMatchs = AllMatchs.concat(match);
        }))

        await Promise.all(date.map(async d => {
            var match = await Match.getMatchByDate(d);
            Matchs.push(match);

        }))
        Matchs = Matchs.reverse();
        var match1 = Matchs[0];
        var match2 = Matchs[1];
        var match3 = Matchs[2];

        AllMatchs = AllMatchs.reverse();
        AllMatchs = await util.getLogoMatch(AllMatchs);
        match1 =await util.getLogoMatch(match1);
        match2 =await util.getLogoMatch(match2);
        match3 =await util.getLogoMatch(match3);
        console.log(AllMatchs);
        var user = req.session.user
        
        res.render('danhsachtrandau',{user,AllMatchs ,date1: date[0], date2: date[1], date3: date[2] ,match1,match2, match3})
    }
    
}


module.exports = new scheduleController;