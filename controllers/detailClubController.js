const Club = require('../models/Club')

class DetailClubController{
    async index(req,res){
        const {name} = req.params;
        var club = await Club.getClubByName(name);
        //console.log(club)
        return res.render('detailClub',{club})
    }
}

module.exports = new DetailClubController;