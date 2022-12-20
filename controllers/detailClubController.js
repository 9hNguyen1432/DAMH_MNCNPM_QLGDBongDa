const Club = require('../models/Club')

class DetailClubController{
    async index(req,res){
        const {name} = req.params;
        var club = await Club.getClubByName(name);
        //console.log(club)
        var user = req.session.user
        return res.render('detailClub',{club,user})
    }
}

module.exports = new DetailClubController;