import { club } from '../class/club.js';
import { infoMatch } from '../class/infoMatch.js';
import { resultOfMatch } from '../class/resultOfMatch.js';

export function sorting(list)//truyền vào list gồm các đối tượng infoTeam
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

export function sortingSchedule(schedule, listClub)//listclub gồm các club, schedule gồm các infoMatch
{
    var check_even = false
    if(listClub.length %2 == 0)
    {
        check_even = true
    }
    var home = []
    var guest = []
    var half
    if(check_even == true)
    {
        half = listClub.length/2
    }
    else
    {
        half = Math.round(listClub.length/2) -1
    }
    for(var i = 0; i < half;i++)
    {
        home.push(listClub[i])
    }
    for(var i = half; i < listClub.length;i++)
    {
        guest.push(listClub[i])
    }
    if(check_even)
    {
        var totalMatches = listClub.length*(listClub.length-1)/2
        for (var i = 0; i< totalMatches/home.length;i++)
        {
            //thêm lịch
            for (var j = 0; j < home.length; j++)
            {
                var newMatch = new infoMatch(home[j].teamName, guest[j].teamName,home[j].teamMembers, guest[j].teamMembers, home[j].teamField)
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
        var totalMatches = (listClub.length+1)*listClub.length/2
        home.push(new club("identify","identify","identify"))
        for (var i = 0; i< totalMatches/home.length;i++)
        {
            //thêm lịch
            for (var j = 0; j < home.length; j++)
            {
                if(home[j].teamName != 'identify' && guest[j].teamName != 'identify')
                {
                    var newMatch = new infoMatch(home[j].teamName, guest[j].teamName,home[j].teamMembers, guest[j].teamMembers, home[j].teamField)
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
    return schedule
}
//----demo cách sử dụng hàm sortingSchedule
// var schedule = []
// var club1 = new club ("Hoàng Anh Gia Lai", "Pleiku", "updating...")
// var club2 = new club ("FC Hà Nội", "Mỹ Đình", "updating...")
// var club3 = new club ("FC Sài Gòn", "Thống Nhất", "updating...")
// var club4 = new club ("Hải Phòng FC", "Lạch Trây", "updating...")
// var club5 = new club ("Đà Nẵng", "SHB", "updating...")
// var listClub = [club1,club2,club3,club4, club5]
// var x = sortingSchedule(schedule, listClub)
// for(var i = 0; i< x.length;i++)
// {
//     console.log(x[i])
// }
