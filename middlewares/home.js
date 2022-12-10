

function isAdmin (req, res, next) {
    if (req.session.user){
      if(req.session.user.author)  
        return res.redirect('/manage');
        return next()
    }
    return next();
}

module.exports = {isAdmin}