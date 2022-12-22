const express = require("express");
const handlebars = require("express-handlebars");

module.exports = (app) => {
  app.engine(
    "hbs",
    handlebars.engine({
      extname: ".hbs",
      helpers: {
        ifNotEqualZero: function (value, options) {
          if (value > 0) {
            return options.fn(this);
          }
        },
        rendercombolist: function (value, options) {
          let item = "";
          for (let i = 0; i < value.length; i++) {
            if (i==0){
              item = item + "<option value='"+options.fn(value[i])+"' selected>" + options.fn(value[i]) + "</option>"
            }
            else{
            item = item + "<option value='"+options.fn(value[i])+"'>" + options.fn(value[i]) + "</option>";
          }
        }
          return item
        },

        renderlines: function (value, options) {
          let item = "";
          for (let i = 0; i < value.length; i++) {
            item = item + "<p>" + options.fn(value[i]) + "</p>";
          }
          return item;
        }
      }
    })
  );
  app.set("view engine", "hbs");
};
