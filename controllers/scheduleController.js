
const util = require('../models/util')
const Match = require('../models/Match');
const { all } = require('../routers/manageRouter.r');


class scheduleController{

    async index(req,res){
        var allDate =[]
        allDate = await Match.getAllDate();
        const date = await Match.getDateNotFinish();
        var AllMatchs = []
        var Matchs = []
        //console.log(allDate);
        for(let i =0; i< allDate.length; i++){
            let temp = await Match.getMatchByDate(allDate[i]);
            AllMatchs = AllMatchs.concat(temp)
            for(let j =0; j<date.length; j++){
                if (date[j] == date[i]){
                    Matchs.push(temp)
                }
            }
        }
        
    var match1 = Matchs[0]
    var match2 = Matchs[1]
    var match3 = Matchs[2]
    
        // AllMatchs = AllMatchs.reverse();
        var user = req.session.user
        AllMatchs = AllMatchs.sort((a,b)=>{
            var dateParts1 = a.date.split("/");
            var dateParts2 = b.date.split("/");
            if(a.date==b.date){
                var t1 = a.time.split(":");
                var t2 = b.time.split(":");
                var m1 = parseInt(t1[0]) * 60 + parseInt(t1[1]);
                var m2 = parseInt(t2[0]) * 60 + parseInt(t2[1]);
              return m1- m2
            }
    
            return (
             new Date(+dateParts1[2], dateParts1[1] - 1, +dateParts1[0])-
               new Date(+dateParts2[2], dateParts2[1] - 1, +dateParts2[0])
               
            );
        })

        res.render('danhsachtrandau',{user,AllMatchs ,date1: date[0], date2: date[1], date3: date[2] ,match1,match2, match3})
    }
    
}


module.exports = new scheduleController;