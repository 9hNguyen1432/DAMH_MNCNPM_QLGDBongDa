const Player = require('../models/Player')

class EditPlayerController{
    async index(req,res){

        const {id} = req.params

        const player = await Player.getPlayerById(id)

        var user = req.session.user
        return res.render('chinhsuacauthu', {user, player})
    }
}

module.exports = new EditPlayerController;