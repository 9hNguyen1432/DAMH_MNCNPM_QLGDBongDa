class HomePageController{
    index(req,res){
        res.render('login')
    }
}

module.exports = new HomePageController;