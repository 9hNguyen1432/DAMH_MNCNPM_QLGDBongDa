
const express = require("express");
const handlebars = require("express-handlebars");
const routes = require('./routers');
const path = require('path')
const session = require('express-session');

// Router
//const appRoute = require('./routers/app.r.js');
// End Router

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))

require("./config/hbs")(app);



const oneDay = 1000 * 60 * 60 * 24;
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay  }
}))


routes(app)

app.listen (port, () => console.log(`Example app listening at http://localhost:${port}`));
