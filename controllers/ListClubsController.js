
const Club = require('../models/Club')

class ListClubsController{
    async index(req,res){

        var clubs = await Club.getAllClub();
        // clubs = [...clubs, ...clubs, ...clubs]

        var user = req.session.user

        return res.render('listClubs',{user,clubs})
    }
}

module.exports = new ListClubsController;