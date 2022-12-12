const Match = require('../models/Match')


class resultController{
    index(req,res){
        res.render('ketquacactrandau')
    }
}

module.exports = new resultController;