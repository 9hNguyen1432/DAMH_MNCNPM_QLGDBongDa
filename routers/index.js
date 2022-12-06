const homeRouter = require('./homeRouter')
const authRouter = require('./authRouter')

function route(app){
    app.use('/auth', authRouter);
    app.use('/', homeRouter);
}

module.exports = route