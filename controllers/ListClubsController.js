
const Club = require('../models/Club')

class ListClubsController{
    async index(req,res){

        var clubs = await Club.getAllClub();
        clubs = [...clubs, ...clubs, ...clubs]

        return res.render('listClubs',{clubs})
    }
}

module.exports = new ListClubsController;