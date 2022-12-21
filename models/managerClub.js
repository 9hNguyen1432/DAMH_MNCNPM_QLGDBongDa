const csv = require('csvtojson')
const util = require('../models/util')
const rules = require('../models/rules')
const Player = require('../models/player')

//util
exports.checkListPlayer = async (listPlayer) => {
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
    var noiBinh = "Nội Binh";
    var ngoaiBinh = "Ngoại Binh";
    for (let player of listPlayer) {
        try {
            let age = util.getAge(player.DOB);
            if (util.isBetween(age, rulesLeauge.minAge, rulesLeauge.maxAge)) {
                const checkExist = await Player.getPlayerById(player.idCauThu);

                if (checkExist == undefined) {
                    if (player.type.toLocaleLowerCase().normalize() === ngoaiBinh.toLocaleLowerCase().normalize()) {

                        numOfForeignerPlayer++;
                        listPlayerValid.push(player)
                    }
                    else if (player.type.toLocaleLowerCase().normalize() == noiBinh.toLocaleLowerCase().normalize()) {

                        listPlayerValid.push(player)
                    }
                    else {
                        throw ("Loại cầu thủ không đúng.");
                    }
                }
                else{
                    throw("Cầu thủ đã được CLB khác sử dụng");
                }

            }
            else {
                
                listPlayerInvalid.push(player)
            }
        }
        catch (err) {
            listPlayerInvalid.push(player)
        }
    }
    if (util.isBetween(listPlayerValid.length, rulesLeauge.minPlayer, rulesLeauge.maxPlayer)) {
        constrainNumOfPlayers = true;
    }
    if (numOfForeignerPlayer <= rulesLeauge.foreignerPlayer) {
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


exports.CSVFiletoJsonObject = async (uriFile) => {
    csv({
        noheader: false,
        headers: ['idCauThu', 'ten', 'DOB', 'number', 'type', 'description']
    })
        .fromString(uriFile)
        .then((jsonObj) => {
            /**
             * [
             * 	{a:"1", b:"2", c:"3"},
             * 	{a:"4", b:"5". c:"6"}
             * ]
             */
        })
    const jsonArray = await csv({
        noheader: false,
        headers: ['idCauThu', 'ten', 'DOB', 'number', 'type', 'description']
    }).fromString(uriFile);
    return jsonArray;
}

