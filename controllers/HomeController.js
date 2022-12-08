
class HomePageController{
    index(req,res){
        var user = req.session.user
       // res.render('home',{user});

        res.render('giaodienchinh')

    }
}

module.exports = new HomePageController;