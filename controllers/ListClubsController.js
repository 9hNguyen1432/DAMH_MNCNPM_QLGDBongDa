
const Club = require('../models/Club')
const Match = require('../models/Match')

class ListClubsController{
    async index(req,res){
        

        await Match.updateMatchIsRunning()

        var clubs = await Club.getAllClub();
        

        var user = req.session.user

        return res.render('listClubs',{user,clubs})
    }
}

module.exports = new ListClubsController;