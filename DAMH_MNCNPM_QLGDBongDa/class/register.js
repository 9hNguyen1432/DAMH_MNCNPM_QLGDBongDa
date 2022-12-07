import { messageRegister } from '../../JavaScript/handle/message.js';
import { checkRegister } from '../handle/handleAcc.js';

class Register
{
    constructor(email, pass, repass, fullname, date, gender, role, accept)
    {
        this.email=email
        this.pass=pass
        this.repass=repass
        this.fullname=fullname
        this.date=date
        this.gender=gender
        this.role=role
        this.accept=accept
    }
    Status(type)
    {
        var num = checkRegister(this);
        if(num == -1)
        {
            this.createNewAccount();
            return [type, ""]
        }
        else
        {
            return messageRegister(num)
        }
    }
    createNewAccount()
    {
        //post info lên db
    }

}
var tmp = "abc"
var z
var x = new Register(tmp,tmp,tmp,tmp, "2022-03-12", tmp, z, tmp)
console.log(x)