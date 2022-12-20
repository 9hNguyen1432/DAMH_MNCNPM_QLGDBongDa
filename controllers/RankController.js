const Club = require('../models/Club')
const Rules = require('../models/rule')
const Match = require('../models/match')
class RankController{
    async index(req,res){

        var CLB = await Club.getAllClub();

        console.log(CLB)

        const Rule = await Rules.getRulesFromDataBase();

        var priorityRank = Rule.priorityToRank;

            CLB = await CLB.sort(async (a,b)=>{
            
            const _score = b.score - a.score;
            const _goalDelta = b.goalDelta - a.goalDelta;
            const _totalGoal = b.totalGoal - a.totalGoal;
            const _facing = await Match.getFacingOf2Club(a.name,b.name);

            const ranks = {score:_score, goalDelta:_goalDelta,totalGoal:_totalGoal,facing:_facing[1]-_facing[0]}
            
            const  priority = [ranks[priorityRank["p1"]],ranks[priorityRank["p2"]],ranks[priorityRank["p3"]],ranks[priorityRank["p4"]]]

            for(var i =0;i<priority.length; i++){
                console.log(priority[i])
                if(priority[i]!= 0){

                    return priority[i]
                }
            }

            return 0;
                
        });

        var user = req.session.user
        return res.render('rank',{user,CLB})
    }
}

module.exports = new RankController;