const csv=require('csvtojson')
const util = require('../models/util')
const rules = require('../models/rules')
//util
exports.checkListPlayer =async (listPlayer) =>{
    var rulesLeauge = await rules.getRulesFromDataBase();
    // lish cau thu hop le (trong khoang tuoi quy dinh)
    var listPlayerValid = [];
    //list cau thu khong hop le
    var listPlayerInvalid = [];
    var numOfForeignerPlayer = 0;
    // dieu kien so cau thu
    var constrainNumOfPlayers = false;
    var constrainForeignerPlayer = false;
    var validListPlayer = false;
    for (let player of listPlayer){
        try{
        let age = util.getAge(player.DOB);
        console.log("tuoi:     " + age)
        if (util.isBetween(age, rulesLeauge.minAge, rulesLeauge.maxAge)){

            if (player.type === "1"){
                numOfForeignerPlayer ++;
                listPlayerValid.push(player)
            }
            else if(player.type ==="0"){
                listPlayerValid.push(player)
            }
            else {
                throw (err);
            }
        }
        else {
            listPlayerInvalid.push(player)
        }
        }
        catch(err){
            listPlayerInvalid.push(player)
        }
    }
    if (util.isBetween(listPlayerValid.length, rulesLeauge.minPlayer, rulesLeauge.maxPlayer)){
        constrainNumOfPlayers = true;
    }
    if (numOfForeignerPlayer <= rulesLeauge.foreignerPlayer){
        constrainForeignerPlayer = true;
    }
    validListPlayer = constrainForeignerPlayer && constrainNumOfPlayers;
     const returnObject = {
        constrainForeignerPlayer,
        constrainNumOfPlayers,
        validListPlayer,
        listPlayerValid,
        listPlayerInvalid,
     }
     return returnObject;
    
}


exports.CSVFiletoJsonObject = async (uriFile) =>{
    csv({
        noheader: false,
        headers: ['stt','idCauThu', 'ten', 'DOB', 'type']
    })
    .fromFile(uriFile)
    .then((jsonObj)=>{
        /**
         * [
         * 	{a:"1", b:"2", c:"3"},
         * 	{a:"4", b:"5". c:"6"}
         * ]
         */ 
    })
    const jsonArray=await csv({
        noheader: false,
        headers: ['stt','idCauThu', 'ten', 'DOB', 'type']
    }).fromFile(uriFile);
    return jsonArray;
}

