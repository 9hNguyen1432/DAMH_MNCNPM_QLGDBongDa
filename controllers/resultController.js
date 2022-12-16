const Match = require('../models/Match')


class resultController{
    async index(req,res){
        const Matchs = await Match.getMatchisFinished();
        res.render('ketquacactrandau', {AllMatchs: Matchs});
    }
}

module.exports = new resultController;