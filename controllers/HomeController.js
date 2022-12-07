class HomePageController{
    index(req,res){
        res.render('giaodienchinh')
    }
}

module.exports = new HomePageController;