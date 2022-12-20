const Player = require('../models/Player')

class DetailPlayerController{
    async index(req,res){

        const {id} = req.params;
        
        var player = await Player.getPlayerById(id);
        console.log(player);

        var user = req.session.user
        return res.render('detailPlayer',{player,user});
    }
}

module.exports = new DetailPlayerController;