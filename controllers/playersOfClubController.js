const Player = require('../models/player')

class PlayerOfClubController{
    async index(req,res){

        const {nameclub} = req.params;
        const playersOfClub = await Player.getPlayersOfClub(nameclub); 

        const user = req.session.user
        return res.render('playersOfClub', {user, playersOfClub})
    }
}

module.exports = new PlayerOfClubController;