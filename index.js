const express = require("express");
const handlebars = require("express-handlebars");
const homeRouter = require('./routers/app.r.js');
const path = require('path')


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))


require("./config/hbs")(app);

// ROUTE
app.use('/', homeRouter)
// END ROUTE


app.listen (port, () => console.log(`Example app listening at http://localhost:${port}`));