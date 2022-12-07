import {club} from './club.js'
import {infoMatch} from './infoMatch.js'
import { sortingSchedule } from '../handle/sort.js';

//schedule là 1 list gồm các infoMatch
//**** ( còn thiếu ) thêm ngày giờ thi đấu vào class infoMatch
export class schedule{
    constructor(Schedule)
    {
        this.Schedule = Schedule
    }
    infoSchedule(listMatch)//listMatch: mảng infoMatch
    {
        return sortingSchedule(this.Schedule, listMatch)
    }
    getter()
    {
        return this.Schedule
    }
}
//----demo cách xài class schedule
var club1 = new club ("Hoàng Anh Gia Lai", "Pleiku", "updating...")
var club2 = new club ("FC Hà Nội", "Mỹ Đình", "updating...")
var club3 = new club ("FC Sài Gòn", "Thống Nhất", "updating...")
var club4 = new club ("Hải Phòng FC", "Lạch Trây", "updating...")
var club5 = new club ("Đà Nẵng", "SHB", "updating...")
var listClub = [club1,club2,club3,club4, club5]
var Schedule = []
var x = new schedule(Schedule)
x.infoSchedule(listClub)
Schedule = x.getter()
for(var i = 0; i< Schedule.length;i++)
{
    console.log(Schedule[i])
}
