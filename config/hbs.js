const express = require("express");
const handlebars = require("express-handlebars");

module.exports = (app) => {
  app.engine(
    "hbs",
    handlebars.engine({
      extname: ".hbs",
      helpers: {
        ifNotEqualZero: function (value,status , options) {
          if (value > 0) {
            return value;
          }
          else if (status == "isFinished"){
            return "FT"
          }
        },
        status: function (value, options) {
          if (value == "notRun") {
            return "";
          }
          else if (value == "isRunning"){
            return "Đang diễn ra";
          }
          else if(value =="isFinished"){
            return "Đã kết thúc"
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
      },
        checkSelected: function (value, list, options){
          if(list.includes(value)){
            return options.fn(this)
          }
        },
        renderListPriorityRank: function(value, options){
          let item = "";
          let label = {
            "score": "Tổng điểm",
            "totalGoal": "Tổng bàn thắng",
            "goalDelta": "Hiệu số bàn thắng",
            "facing": "Lịch sử đối đầu"
          }
          for (let i = 0; i < value.length; i++) {
            item = item + "<li  id='" + options.fn(value[i]) + "' class='border'  style='padding: 3px 5px; margin: 5px 0'><div class='news' >"
            + options.fn(label[value[i]])+"</div></li>";
          }
          return item;
        }
        ,addOne: function(value){
          return value +1
        }

      }
    })
  );
  app.set("view engine", "hbs");
};
