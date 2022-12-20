const multer = require("multer");
const path = require('path');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname, '../public/uploads/')+file.fieldname);
    },
    filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + req.body.tenclb + '.' + file.mimetype.split('/')[1]);
    }
  });

exports.upload = multer({ storage: storage });