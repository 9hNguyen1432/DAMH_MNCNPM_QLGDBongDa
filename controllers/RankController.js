const Club = require('../models/Club')

class RankController{
    async index(req,res){

        var CLB = await Club.getAllClub();
        
        CLB =  CLB.sort((a,b)=>{
            if (a.score != b.score)
                return b.score - a.score;
            else{
                if(a.win!= b.win)
                    return  b.win - a.win;
                else
                    return b.draw - a.draw;           }
                
        });


        return res.render('rank',{CLB})
    }
}

module.exports = new RankController;