class SearchPlayerController{
    index(req,res){
        res.render('searchFootballPlayer')
    }
}

module.exports = new SearchPlayerController;