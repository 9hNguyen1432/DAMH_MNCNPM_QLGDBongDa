 const Player = require('../models/Player')

class DetailPlayerController{
    async index(req,res){

        const {id} = req.params

        const player = await Player.getPlayerById(id)

        var user = req.session.user
        return res.render('detailPlayer', {user, player})
    }
}

module.exports = new DetailPlayerController;