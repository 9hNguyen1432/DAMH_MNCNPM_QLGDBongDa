const Club = require('../models/Club')

class DetailClubController{
    async index(req,res){

        // var clubs = await Club.getAllClub();
        // clubs = [...clubs, ...clubs, ...clubs]

        return res.render('detailClub')
    }
}

module.exports = new DetailClubController;