const Match = require('../models/Match');

class scheduleController{

    async index(req,res){
        
        const Date = await Match.getDateNotFinish();

        

        res.render('danhsachtrandau')
    }
    
}

module.exports = new scheduleController;