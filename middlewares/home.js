function isAuthenticated (req, res, next) {
    if (req.session.user){
       return res.render('home',{layout:'main_logined.hbs'})

    }
    return next();
}

module.exports = isAuthenticated