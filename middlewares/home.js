

function isAdmin (req, res, next) {
    if (req.session.user){
      if(req.session.user.author)  
        return res.redirect('/manage');
    }
    return next()
}

function notAdmin(req, res, next){
  if (req.session.user){
    if(req.session.user.author)  
      return next()
  }
  return res.redirect('/auth/login')
}

module.exports = {isAdmin,notAdmin}