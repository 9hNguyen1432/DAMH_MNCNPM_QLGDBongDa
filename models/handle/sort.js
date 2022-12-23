
const Club = require ('../club.js')
const Match = require('../Match.js')


function sortingSchedule(listOfClub,dayStart)//listOfClub gồm các club, schedule gồm các Match
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
    var newDate = new Date(dayStart)
    var newTime = ["17:00", "20:00"]
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
                var newMatch = new Match.constructor(newID + cnt, dateSchedule[cnt - 1], newTime[(cnt-1)%2], home[j].name, guest[j].name, newReferee, home[j].stadium, 'notRun', 0, 0, 0, 0, timeRunning, 'N')
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
        home.push(new Club.constructor("identify","identify.png","identify", "identify","identify","identify",-1,-1,-1,-1,-1,"identify"))
        for (var i = 0; i< totalMatches/home.length;i++)
        {
            //thêm lịch
            for (var j = 0; j < home.length; j++)
            {
                
                if(home[j].name != 'identify' && guest[j].name != 'identify')
                {
                    cnt++
                    var newMatch = new Match.constructor(newID + cnt, dateSchedule[cnt - 1], newTime[(cnt-1)%2], home[j].name, guest[j].name, newReferee, home[j].stadium, 'notRun', 0, 0, 0, 0, timeRunning, 'N')
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
        var newMatch = new Match.constructor(newID + cnt, dateSchedule[cnt - 1], newTime[(cnt-1)%2], schedule[i].club_2, schedule[i].club_1, newReferee, secondStadium[i], 'notRun', 0, 0, 0, 0, timeRunning, 'N')
        schedule.push(newMatch)
    }
    return schedule
}

module.exports = sortingSchedule;