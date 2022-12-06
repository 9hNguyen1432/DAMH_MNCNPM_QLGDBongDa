const account = require('../models/account')
const User = require('../models/User')

class authControllers{
    ShowPagelogin(req, res){
        res.render('login');
    }
    async logIn(req, res, next){
        const {username , password} = req.body;
        var rememberPasswordCheck = req.body.checkstatus

        // if(rememberPasswordCheck!=null){
        //     console.log('ajhsjads')
        // }else{
        //     console.log('asfdvahsdjhasdga')
        // }
        
        let errors =[]

        if(!username || !password){
            errors.push("Vui lòng điền đầy đủ thông tin. ")
            res.render('login',{username,password})

        }
        else if(password.length < 6){
            errors.push("Mật khẩu không < 6 kí tự.")
            res.render('login',{username,password})

        }else{
    
            var rs  = await account.logIn(username,password);
            var result = rs[0];
            var uID = rs[1];
            if(result == false){
               
                if(uID == 'auth/invalid-email'){
                    errors.push("Email không hợp lệ.");
    
                }
                else if(uID == 'auth/user-not-found'){
                    errors.push("Tài khoản không tồn tại.")
    
                } 
                else if(uID == 'auth/wrong-password'){
                    errors.push("Sai mật khẩu.")
                }
                else{
                    errors.push("Đăng nhập thất bại.")
                }
              return  res.render('login',{layout:'main_logined.hbs',data:{username,password}});

            }else{
                
                const user = await User.getUserByEmail(username);

                req.session.regenerate(function (err) {
                    if (err) next(err)
                
                    // store user information in session, typically a user id
                    req.session.user = {
                        ...user,
                    };
    
                    req.session.save(function (err) {
                        if (err) return next(err)
                        res.redirect('/')
                    })
                })
            }
           
        }
    }
}

module.exports = new authControllers;