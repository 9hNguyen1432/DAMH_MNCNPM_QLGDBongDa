class HomePageController{
    index(req,res){
        res.render('rank')
    }
}

module.exports = new HomePageController;