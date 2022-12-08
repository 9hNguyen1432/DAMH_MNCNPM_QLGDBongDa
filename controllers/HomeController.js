
class HomePageController{
    index(req,res){
        var user = req.session.user
        res.render('home',{user});
    }
}

module.exports = new HomePageController;