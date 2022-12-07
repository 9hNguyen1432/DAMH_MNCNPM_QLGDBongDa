import {club} from './club.js'

export class infoMatch
{
    constructor(teamName1,teamName2,squad1,squad2,nameField)
    {
        this.teamName1=teamName1
        this.teamName2=teamName2
        this.squad1=squad1
        this.squad2=squad2
        this.nameField=nameField
    }
    getter()
    {
        return this
    }
}

// var x = new infoMatch("abc","cde","","","Mỹ Đình")
// console.log(x)