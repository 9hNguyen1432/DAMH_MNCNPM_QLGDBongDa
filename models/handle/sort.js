import { Club } from '../club.js'
import {Match} from '../Match.js'

function sortingSchedule(listOfClub)//listOfClub gồm các club, schedule gồm các Match
{
    var schedule = []
    var check_even = false
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
    }
    else
    {
        half = Math.round(listOfClub.length/2) -1
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
    var newDate = new Date("2022-09-01")
    var newTime = "17:00:00"
    const newReferee = "Hoàng Khuê"
    const newStadium = "Vườn Sao Băng"
    const timeRunning = "00:00"
    var cnt = 0
    if(check_even)
    {
        var totalMatches = listOfClub.length*(listOfClub.length-1)/2
        var delta = Math.round(60/totalMatches) 
        for (var i = 0; i< totalMatches/home.length;i++)
        {
            //thêm lịch
            for (var j = 0; j < home.length; j++)
            {
                cnt++
                newDate.setDate(newDate.getDate()+delta)
                var date = new Date(newDate.setDate(newDate.getDate()+delta))
                var newMatch = new Match(newID + cnt, date, newTime, home[j].name, guest[j].name, newReferee, home[j].stadium, "comming soon", 0, 0, timeRunning, "identify")
                schedule.push(newMatch)
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
        var totalMatches = (listOfClub.length+1)*listOfClub.length/2
        var delta = Math.round(60/totalMatches) 
        home.push(new Club("identify","identify.png","identify", "identify","identify","identify",-1,-1,-1,-1,-1,"identify"))
        for (var i = 0; i< totalMatches/home.length;i++)
        {
            //thêm lịch
            for (var j = 0; j < home.length; j++)
            {
                
                if(home[j].name != 'identify' && guest[j].name != 'identify')
                {
                    cnt++
                    var date = new Date(newDate.setDate(newDate.getDate()+delta))
                    var newMatch = new Match(newID + cnt, date, newTime, home[j].name, guest[j].name, newReferee, home[j].stadium, "comming soon", 0, 0, timeRunning, "identify")
                    schedule.push(newMatch)
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
    newDate.setDate(newDate.getDate()+delta)
    const len = schedule.length
    
    for(let i = 0; i < len; i++)
    {
        const newDate_2 = newDate
        newDate.setDate(newDate.getDate()+delta)
        cnt++
        var newMatch = new Match(newID + cnt, newDate_2, newTime, schedule[i].club_2, schedule[i].club_1, newReferee, newStadium, "comming soon", 0, 0, timeRunning, "identify")
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
var club5 = new Club ("123","123.png","Đà Nẵng", "SHB", "updating...","updating...","updating...","updating...","updating...","updating...","updating...","updating...")
var listClub = [club1,club2,club3,club4, club5]
var schedule = sortingSchedule(listClub)
for(let i = 0; i<schedule.length;i++)
{
console.log(schedule[i])
}

