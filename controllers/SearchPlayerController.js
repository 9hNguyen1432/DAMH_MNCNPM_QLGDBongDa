class SearchPlayerController{
    index(req,res){

        var user = req.session.user
        res.render('searchFootballPlayer',{user})
    }
}

module.exports = new SearchPlayerController;