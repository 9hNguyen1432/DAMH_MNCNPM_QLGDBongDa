const Player = require('../models/Player')

class SearchPlayerController{
    async index(req,res){
        
        var playername =req.body.playername

        var players = await Player.searchPlayer(playername)

        var user = req.session.user
        res.render('searchFootballPlayer',{user,players,playername})
    }
}

module.exports = new SearchPlayerController;