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


