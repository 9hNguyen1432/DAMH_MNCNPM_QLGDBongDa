



const Match = require('../models/Match')


class scheduleController{

    async index(req,res){
        const date = await Match.getDateNotFinish();
        var Matchs =[]
        await Promise.all(date.map(async d => {
            var match = await Match.getMatchByDate(d)
            Matchs.push(match)
        }))

        
        res.render('danhsachtrandau',{date,Matchs})
    }
    
}

module.exports = new scheduleController;