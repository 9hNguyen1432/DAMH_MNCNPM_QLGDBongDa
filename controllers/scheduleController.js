



const Match = require('../models/Match')


class scheduleController{

    async index(req,res){
        const allDate = await Match.getAllDate();
        const date = await Match.getDateNotFinish();
        console.log(date)
        var AllMatchs = []
        var Matchs = []

        await Promise.all(allDate.map(async d => {
            let match = await Match.getMatchByDate(d);
            AllMatchs.push(match);
        }))

        await Promise.all(date.map(async d => {
            var match = await Match.getMatchByDate(d);
            Matchs.push(match);
        }))
        const match1 = Matchs[0];
        const match2 = Matchs[1];
        const match3 = Matchs[2];
        Matchs = Matchs.reverse();
        AllMatchs = AllMatchs.reverse();

        res.render('danhsachtrandau',{AllMatchs ,date1: date[0], date2: date[1], date3: date[2] ,match1,match2, match3})
    }
    
}

module.exports = new scheduleController;