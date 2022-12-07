import {resultOfTeam} from '../class/resultOfTeam.js'
export class resultOfMatch{
    constructor(team1,team2)//team1,team2 : resultOfTeam
    {
        this.team1=team1
        this.team2=team2    
    }
    getter()
    {
        return this
    }
}