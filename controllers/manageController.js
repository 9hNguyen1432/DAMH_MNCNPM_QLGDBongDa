class manageController{


    index(req,res){
        var obj = {author: true}
        res.render('home', obj )
    }
    renderRClub(req, res){
        var obj = {author: true}
        res.render('dangkygiaidau',obj)
    }
    renderCreateLeauge(req, res){
        var obj = {author: true}
        res.render('taogiaidaumoi',obj)
    }
    renderEditReg(req, res){
        var obj = {author: true}
        res.render('chinhsuaquydinh',obj)
    }
}

module.exports = new manageController;