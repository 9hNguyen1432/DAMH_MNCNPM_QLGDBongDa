const Player = require('../models/Player')
const Match = require('../models/Match')

class SearchPlayerController{
    async index(req,res){
        await Match.updateMatchIsRunning()

        var playername =req.body.playername

        var players = await Player.searchPlayer(playername)
        //console.log(players)

        var user = req.session.user
        res.render('searchFootballPlayer',{user,players,playername})
    }
}

module.exports = new SearchPlayerController;