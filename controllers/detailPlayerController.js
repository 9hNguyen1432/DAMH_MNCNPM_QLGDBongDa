const Player = require('../models/player')

class DetailPlayerController{
    async index(req,res){

        // var clubs = await Club.getAllClub();
        // clubs = [...clubs, ...clubs, ...clubs]

        return res.render('detailPlayer')
    }
}

module.exports = new DetailPlayerController;