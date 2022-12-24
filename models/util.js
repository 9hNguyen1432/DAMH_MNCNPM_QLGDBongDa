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
