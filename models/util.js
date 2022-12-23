const Club= require('./club')

exports.getAge = (DOB) => {
    var DOByyyy = DOB.split('/')[2];

    var today = new Date();
    var yyyy = today.getFullYear();
    return yyyy-DOByyyy;
}

exports.isBetween = (vari, start, end)=>{
    if (vari <= end && vari >= start){
        return true;
    }
    return false;
}

exports.inFuture=(date)=>{
    let day = new Date(date);
    let today = new Date();
    return day>=today;
}

exports.unserialize = (serializedData) => {
    let urlParams = new URLSearchParams(serializedData); // get interface / iterator
    let unserializedData = {}; // prepare result object
    let arr = []
    for (let [key, value] of urlParams) { // get pair > extract it to key/value
        if (key == "typeOfGoal"){
            arr.push(value);
        }
        else{
        unserializedData[key] = value;
        }
    }
    unserializedData["typeOfGoal"] = arr;

    return unserializedData;
}

exports.getLogoMatch = async (matchs)=>{
    let info =[];
    for (let i = 0; i< matchs.length; i++){
        let club1 = await Club.getClubByName(matchs[i].club_1);
        let club2 = await Club.getClubByName(matchs[i].club_2);
        let logos ={
            logo1: club1.logo,
            logo2: club2.logo,
        }
        info.push({
            match: matchs[i], logos
        })
    }
    return info;
}