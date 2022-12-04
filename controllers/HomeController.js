class HomePageController{
    index(req,res){
        res.render('registerUser')
    }
}

module.exports = new HomePageController;