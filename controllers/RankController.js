const Club = require('../models/Club')
const Rules = require('../models/rule')
const Match = require('../models/match')
class RankController{
    async index(req,res){

        var CLB = await Club.getAllClub();
        const Rule = await Rules.getRulesFromDataBase();

        var priorityRank = Rule.priorityToRank;
        
        var listOfFace = []
        var _facing 
        for(let i = 0; i < CLB.length - 1;i++)
        {
            for(let j = i + 1; j < CLB.length; j++)
            {
                _facing = await Match.getFacingOf2Club(CLB[i].name,CLB[j].name)
                listOfFace.push([CLB[i].name, CLB[j].name, _facing[0], _facing[1]])
            }    
        }

        CLB = CLB.sort(function(a,b){
            const _score = a.score - b.score;
            const _goalDelta = a.goalDelta - b.goalDelta;
            const _totalGoal = a.totalGoal - b.totalGoal;

            var _facingDelta 
            for(let i = 0; i < listOfFace.length;i++)
            {
                if(a.name == listOfFace[i][0] && b.name == listOfFace[i][1])
                {
                    _facingDelta = listOfFace[i][2] - listOfFace[i][3]
                }
                else if (a.name == listOfFace[i][1] && b.name == listOfFace[i][0])
                {
                    _facingDelta = listOfFace[i][3] - listOfFace[i][2]
                }
            }
            const ranks = {score:_score, goalDelta:_goalDelta,totalGoal:_totalGoal,facing:_facingDelta}
   
            const  priority = [ranks[priorityRank["p1"]],ranks[priorityRank["p2"]],ranks[priorityRank["p3"]],ranks[priorityRank["p4"]]]
            console.log(priority)
            for(var i = 0;i<priority.length; i++){
                if(priority[i]!= 0){
                    return - priority[i]
                }
            }
            return 0;
                
        });
        var user = req.session.user
        return res.render('rank',{user,CLB})
    }
}

module.exports = new RankController;
