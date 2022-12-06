
class HomePageController{
    index(req,res){
        res.render('home')
    }
}

module.exports = new HomePageController;