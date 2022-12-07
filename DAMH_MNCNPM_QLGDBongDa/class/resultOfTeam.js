//kết quả sau 1 trận đấu
export class resultOfTeam{
    constructor(teamName, totalScore, scorer, totalCards, fined_player)
    {
        this.teamName=teamName
        this.totalScore=totalScore
        this.scorer=scorer
        this.totalCards=totalCards
        this.fined_player=fined_player
    }
    getter()
    {
        return this
    }
}