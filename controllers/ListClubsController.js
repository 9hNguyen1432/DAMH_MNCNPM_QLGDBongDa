class ListClubsController{
    index(req,res){
        res.render('listClubs')
    }
}

module.exports = new ListClubsController;