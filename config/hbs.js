const express = require("express");
const handlebars = require("express-handlebars");

module.exports = (app) => {
  app.engine(
    "hbs",
    handlebars.engine({
      extname: ".hbs",
      helpers:{
        ifNotEqualZero: function(value,options) {
            if(value > 0){
                return options.fn(this);
            }
        }
      }
    })
  );
  app.set("view engine", "hbs");
};
