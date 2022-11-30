const express = require("express");
const handlebars = require("express-handlebars");
const homeRouter = require('./routers/app.r.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/hbs")(app);

app.use('/', homeRouter)
// app.use('/user', require("./routers/user.r"))

app.listen (port, () => console.log(`Example app listening at http://localhost:${port}`));