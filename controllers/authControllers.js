const account = require('../models/account')
const User = require('../models/User')

class authControllers{
    ShowPagelogin(req, res){
        res.render('login');
    }

    ShowPageRegister(req,res){
        res.render('registerUser')
    }
    async logIn(req, res, next){
        const {username , password} = req.body;

        let errors =[]

        if(!username || !password){
            errors.push("Vui lòng điền đầy đủ thông tin. ")
            res.render('login',{username,password, errors})
        }
        else if(password.length < 6){
            errors.push("Mật khẩu không ít hơn 6 kí tự.")
            res.render('login',{username,password, errors})

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
                return res.render('login',{username,password,errors});

            }else{
                
                const user = await User.getUserByEmail(username);

                req.session.regenerate(function (err) {
                    if (err) next(err)
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
    async register(req, res, next){
        const {email,password,repass, fullname, birthday,gender,role} =req.body;
        let errors =[];
        if(!email||!password||!fullname||!birthday||!gender||!role||!repass){
            errors.push("Vui lòng điền đầy đủ thông tin.")
        if(password.length < 6 )
            errors.push("Mật khẩu không được ít hơn 6 kí tự.")
        }
        if(password!=repass){
            errors.push("Mật khẩu không trùng khớp.")
        }
        if(errors.length>0){
            return res.render('registerUser',{email,password,repass, fullname, birthday,gender,role,errors})
        }
        else{
            var rs  = await account.createACcount(email,password);
            var result = rs[0];
            var uID = rs[1];
            if(!result){
                if(uID =='auth/email-already-in-use'){
                    errors.push("Email đã được đăng kí.")
                }else if(uID =='auth/invalid-email'){
                    errors.push("Email không đúng định dạng.")
                }else{
                    errors.push("Đăng kí không thành công.")
                }
                return res.render('registerUser',{email,password,repass, fullname, birthday,gender,role,errors})
            }else{
                const user =new User.constructor(uID,email,fullname,birthday,gender,role,false);
                await User.addUser(user);
                return res.redirect('/auth/login');
            }
        }
    }

    logout(req, res, next){
        req.session.destroy();
        res.redirect('/auth/login');
    }
}

module.exports = new authControllers;