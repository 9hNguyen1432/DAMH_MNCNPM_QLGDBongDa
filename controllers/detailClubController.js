const Club = require('../models/Club')

class DetailClubController{
    async index(req,res){
        const {name} = req.params;
        var club = await Club.getClubByName(name);

        var user = req.session.user
        return res.render('detailClub',{user, club})
    }
}

module.exports = new DetailClubController;