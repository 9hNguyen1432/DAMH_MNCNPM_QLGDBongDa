// import { Club } from '../club.js'
// import {Match} from '../Match.js'
class Match {
    constructor(id,date,time,club_1,club_2, referee,stadium,status,goal_1,goal_1_bf,goal_2, goal_2_bf,timeRunning, rs, report = [[],[]] ) 
    {
      this.id = id;
      this.date = date;
      this.time = time;
      this.club_1 = club_1;
      this.club_2 = club_2;
      this.referee = referee;
      this.stadium = stadium;
      this.status = status;
      this.goal_1 = goal_1;
      this.goal_2 = goal_2;
      this.goal_1_bf = goal_1_bf;
      this.goal_2_bf =goal_2_bf;
      this.timeRunning = timeRunning;
      this.rs = rs;
      this.report = report
    }
}  
class Club
{
    constructor(id,logo,name, stadium, listPlayer,coach,captain,totalGoal=0,goalDelta=0,score = 0,numberMatch = 0,win = 0,draw = 0,lost = 0,description="")
    {
        this.id =id;
        this.logo = logo;
        this.name=name
        this.stadium=stadium
        this.listPlayer = listPlayer
        this.coach = coach;
        this.captain = captain;
        this.score = score;
        this.numberMatch = numberMatch ;
        this.totalGoal = totalGoal;
        this.goalDelta = goalDelta;
        this.win = win;
        this.draw = draw;
        this.lost = lost;
        this.description = description;
        //Khởi tạo club ban đầu với score = 1; win = 0; draw = 1; lost = 0

    }
}
function sortingSchedule(listOfClub)//listOfClub gồm các club, schedule gồm các Match
{
    var schedule = []
    var check_even = false
    var totalMatches, totalMatchesPerWeek, totalWeeks
    if(listOfClub.length %2 == 0)
    {
        check_even = true
    }
    var home = []
    var guest = []
    var half
    if(check_even == true)
    {
        half = listOfClub.length/2
        totalMatches = listOfClub.length*(listOfClub.length-1)/2
        totalWeeks = totalMatches/half
        totalMatchesPerWeek = half
    }
    else
    {
        half = Math.round(listOfClub.length/2) -1
        totalMatches = (listOfClub.length+1)*listOfClub.length/2
        totalWeeks = totalMatches/((listOfClub.length+1)/2)
        totalMatchesPerWeek = (listOfClub.length+1)/2
    }
    for(var i = 0; i < half;i++)
    {
        home.push(listOfClub[i])
    }
    for(var i = half; i < listOfClub.length;i++)
    {
        guest.push(listOfClub[i])
    }
    var newID ="TD"
    var newDate = new Date("2022-09-02")
    var newTime = ["17:00:00", "19:00:00"]
    const newReferee = "Hoàng Khuê"
    var secondStadium = []
    const timeRunning = 0
    var cnt = 0
    //xếp lịch thời gian
    var totalDaysPerWeek = 3
    if(half < 3)
    {
        totalDaysPerWeek = half
    }
    var b = (totalDaysPerWeek - totalMatchesPerWeek%totalDaysPerWeek)%totalDaysPerWeek
    var a = totalDaysPerWeek - b
    var totalMatchesPerDay = (totalMatchesPerWeek + b)/totalDaysPerWeek
    var dateSchedule=[]
    var i = 0
    var curdate
    const deltaDateOf2Week = 8 - totalDaysPerWeek
    for(let i = 0; i < 2 * totalWeeks ;i++)
    {
        for(let k = 0; k < a; k++)
        {
            curdate = ("0" + newDate.getDate()).slice(-2) + '/' + ("0" + (newDate.getMonth() + 1)).slice(-2) + '/' + newDate.getFullYear()
            for(let q = 0; q < totalMatchesPerDay; q++)
            {
                dateSchedule.push(curdate)
            }
            newDate.setDate(newDate.getDate() + 1);
        }
        for(let k = 0; k < b; k++)
        {
            curdate = ("0" + newDate.getDate()).slice(-2) + '/' + ("0" + (newDate.getMonth() + 1)).slice(-2) + '/' + newDate.getFullYear()
            for(let q = 0; q < totalMatchesPerDay - 1; q++)
            {
                dateSchedule.push(curdate)
            }
            newDate.setDate(newDate.getDate() + 1);
        }
        newDate.setDate(newDate.getDate() + deltaDateOf2Week);
    }   
    if(check_even)
    {   
        for (var i = 0; i< totalMatches/home.length;i++)
        {
            //thêm lịch
            for (var j = 0; j < home.length; j++)
            {
                cnt++
                var newMatch = new Match(newID + cnt, dateSchedule[cnt - 1], newTime[(cnt-1)%2], home[j].name, guest[j].name, newReferee, home[j].stadium, 'notRun', 0, 0, timeRunning, 'H')
                schedule.push(newMatch)
                secondStadium.push(guest[j].stadium)
            }
            //vòng mới
            home.splice(1, 0, guest[0])
            guest.push(home[home.length-1])
            home.pop()
            guest.shift()
        }
    }
    else
    {
        //thêm đội ảo vào home
        home.push(new Club("identify","identify.png","identify", "identify","identify","identify",-1,-1,-1,-1,-1,"identify"))
        for (var i = 0; i< totalMatches/home.length;i++)
        {
            //thêm lịch
            for (var j = 0; j < home.length; j++)
            {
                
                if(home[j].name != 'identify' && guest[j].name != 'identify')
                {
                    cnt++
                    var newMatch = new Match(newID + cnt, dateSchedule[cnt - 1], newTime[(cnt-1)%2], home[j].name, guest[j].name, newReferee, home[j].stadium, 'notRun', 0, 0, timeRunning, 'H')
                    schedule.push(newMatch)
                    secondStadium.push(guest[j].stadium)
                }
            }
            //vòng mới
            home.splice(1, 0, guest[0])
            guest.push(home[home.length-1])
            home.pop()
            guest.shift()
        }
    }
    //thêm lượt về
    const len = schedule.length
    for(let i = 0; i < len; i++)
    {
        cnt++
        var newMatch = new Match(newID + cnt, dateSchedule[cnt - 1], newTime[(cnt-1)%2], schedule[i].club_2, schedule[i].club_1, newReferee, secondStadium[i], 'notRun', 0, 0, timeRunning, 'H')
        schedule.push(newMatch)
    }
    return schedule
}
//---------DEMO
var schedule = []
var club1 = new Club ("123","123.png","Hoàng Anh Gia Lai", "Pleiku", "updating...","updating...","updating...","updating...","updating...","updating...","updating...","updating...")
var club2 = new Club ("123","123.png","FC Hà Nội", "Mỹ Đình", "updating...","updating...","updating...","updating...","updating...","updating...","updating...","updating...")
var club3 = new Club ("123","123.png","FC Sài Gòn", "Thống Nhất", "updating...","updating...","updating...","updating...","updating...","updating...","updating...","updating...")
var club4 = new Club ("123","123.png","Hải Phòng FC", "Lạch Trây", "updating...","updating...","updating...","updating...","updating...","updating...","updating...","updating...")
var club5 = new Club ("123","123.png","Hải Phòng FC", "Lạch Trây", "updating...","updating...","updating...","updating...","updating...","updating...","updating...","updating...")
var club6 = new Club ("123","123.png","tphcm", "SHB", "updating...","updating...","updating...","updating...","updating...","updating...","updating...","updating...")
var club7 = new Club ("123","123.png","zzzz", "Pleiku", "updating...","updating...","updating...","updating...","updating...","updating...","updating...","updating...")
var club8 = new Club ("123","123.png","aaaaa", "Mỹ Đình", "updating...","updating...","updating...","updating...","updating...","updating...","updating...","updating...")
var club9 = new Club ("123","123.png","bbbbbb", "Thống Nhất", "updating...","updating...","updating...","updating...","updating...","updating...","updating...","updating...")
var club10 = new Club ("123","123.png","cccccc", "Lạch Trây", "updating...","updating...","updating...","updating...","updating...","updating...","updating...","updating...")
var club11 = new Club ("123","123.png","dddddd", "SHB", "updating...","updating...","updating...","updating...","updating...","updating...","updating...","updating...")
var club12 = new Club ("123","123.png","eeeeee", "Pleiku", "updating...","updating...","updating...","updating...","updating...","updating...","updating...","updating...")
var club13 = new Club ("123","123.png","ffffff", "Mỹ Đình", "updating...","updating...","updating...","updating...","updating...","updating...","updating...","updating...")
var club14 = new Club ("123","123.png","asasssda", "Thống Nhất", "updating...","updating...","updating...","updating...","updating...","updating...","updating...","updating...")
var listClub = [club1,club2,club3,club4, club5,club6,club7,club8,club9, club10,club11,club12,club13,club14]
//var listClub = [club1,club2,club3,club4]
var schedule = sortingSchedule(listClub)
for(let i = 0;i<schedule.length;i++)
{
    console.log(schedule[i])
}
