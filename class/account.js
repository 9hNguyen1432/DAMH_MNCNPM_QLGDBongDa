import { messageLogIn } from '../../JavaScript/handle/message.js';
import { checkLog } from '../../JavaScript/handle/handleAcc.js';
class Account
{
    constructor(email, pass, remember)
    {
        this.email=email
        this.pass=pass
        this.remember=remember
    }
    Status(type)
    {
        var num = checkLog(this);
        if(num == -1 || num == -2)//thực hiện đăng nhập
        {
            //thiếu chức năng remember, để tượng trưng
            if(num==-2)
            {
                //do
            }
            this.logIn();
            return [type, ""]
        }
        else//thông báo ra màn hình đăng ký thất bại
        {
            return messageLogIn(num)
        }
    }
    logIn()
    {
        //get info đăng nhập từ db
    }
    //thiếu chức năng remember
}
var z
var x = new Account("ddd",z,"aa")
console.log(x.Status())