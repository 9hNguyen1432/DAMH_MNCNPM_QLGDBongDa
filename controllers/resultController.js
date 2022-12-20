const Match = require('../models/Match')


class resultController{
    async index(req,res){
        const Matchs = await Match.getMatchisFinished();

        var user = req.session.user
        res.render('ketquacactrandau', {user,AllMatchs: Matchs});
    }
}

module.exports = new resultController;