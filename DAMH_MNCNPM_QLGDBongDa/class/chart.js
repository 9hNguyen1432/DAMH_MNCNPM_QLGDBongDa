import {resultOfMatch} from './resultOfMatch.js'
import {historyAllMatches} from './historyAllMatches.js'
import { sorting } from '../../JavaScript/handle/sort.js';

class chart
{
    constructor(list)//list: mảng xếp hạng của các đội (generalResultOfTeam) đã được sort
    {
        this.list = list
    }
    // cập nhật kết quả vừa thi đấu
    update(match)
    {
        //truy vấn 2 đội nằm trong match (mô tả: this.list[i].teamName == match.team1.teamName || this.list[i].teamName == match.team2.teamName)
        //get db gán vào this.list
    }
    ranking()
    {
        sorting(this.list)
    }
}
