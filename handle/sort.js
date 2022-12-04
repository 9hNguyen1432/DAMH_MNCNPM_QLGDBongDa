import { resultOfMatch } from '../../JavaScript/class/resultOfMatch.js';

export function sorting(list)
{
    list.sort(function (team1,team2){if(team1.totalMarks > team2.totalMarks)
        {
            return -1;
        }
        else if (team1.totalMarks < team2.totalMarks)
        {
            return 1;
        }
        else
        {
            if (team1.totalGoals > team2.totalMarks)
            {
                return -1;
            }
        }});
}

