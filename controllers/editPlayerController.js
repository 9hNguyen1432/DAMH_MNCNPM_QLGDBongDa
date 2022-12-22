const Player = require('../models/Player')
const uploadImage = require('../models/uploadImage')

class EditPlayerController{
    async index(req,res){
        const {id} = req.params

        let player = await Player.getPlayerById(id)
        let birthday = player.birthday;
        player.birthday = birthday.split("/").reverse().join("-")

        var user = req.session.user
        return res.render('chinhsuacauthu', {id,user,player})
    }

    async editPlayer(req,res,next){
        const {id} = req.params
        let player = await Player.getPlayerById(id)

        let {name, logo, number, role,club,description,birthday} = req.body
        console.log(req.file)
        

        let newPlayer = new Player.constructor(id,avt,name, birthday,club,number,role,description);

        console.log(newPlayer)
        var user = req.session.user
        return res.render('chinhsuacauthu',{user})
    }
}

module.exports = new EditPlayerController;