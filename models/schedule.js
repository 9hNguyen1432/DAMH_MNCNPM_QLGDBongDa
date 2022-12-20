const Match = require("./Match.js")
const Club = require("./club.js")

const Schedule = 
{
    scheduleMatchs:async()=>{
        const listOfClub = await Club.getAllClub();
        
    }

}
Schedule.scheduleMatchs()
