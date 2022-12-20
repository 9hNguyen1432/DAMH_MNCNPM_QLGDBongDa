const Club = require('../models/Club')
const Rules = require('../models/rule')
const Match = require('../models/match')
class RankController{
    async index(req,res){

        var CLB = await Club.getAllClub();
        for(var i = 0; i < CLB.length;i++)
        {
            console.log(CLB[i])
        }
        const Rule = await Rules.getRulesFromDataBase();

        var priorityRank = Rule.priorityToRank;

        CLB = CLB.sort(function(a,b){
            const _score = a.score - b.score;
            const _goalDelta = a.goalDelta - b.goalDelta;
            const _totalGoal = a.totalGoal - b.totalGoal;
            const _facing = Match.getFacingOf2Club(a.name,b.name);

            const ranks = {score:_score, goalDelta:_goalDelta,totalGoal:_totalGoal,facing:_facing[0]-_facing[1]}
            
            const  priority = [ranks[priorityRank["p1"]],ranks[priorityRank["p2"]],ranks[priorityRank["p3"]],ranks[priorityRank["p4"]]]
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
