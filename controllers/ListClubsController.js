
const Club = require('../models/Club')

class ListClubsController{
    async index(req,res){

        var clubs = await Club.getAllClub();
        return res.render('listClubs',{clubs})
    }
}

module.exports = new ListClubsController;