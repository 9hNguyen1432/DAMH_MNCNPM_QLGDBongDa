const Player = require('../models/Player')
const path = require('path')
const multer  = require('multer');
const upload = multer({ dest: path.join(__dirname, '../public/uploads/imgs')});
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

        let {name, number, role,club,description,birthday} = req.body
        let avt = player.avt;

        if(req.file != undefined){
            avt = await uploadImage(req.file)
        }

        let newPlayer = new Player.constructor(id,avt,name, birthday,club,number,role,description);
        await Player.editPlayerById(newPlayer)

        const editedPlayer = await Player.getPlayerById(id)

        var user = req.session.user
        return res.render('chinhsuacauthu',{id,user,player:editedPlayer})
    }
}

module.exports = new EditPlayerController;