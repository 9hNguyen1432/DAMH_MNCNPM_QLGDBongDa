const homeRouter = require('./homeRouter')
const authRouter = require('./authRouter')
const searchPlayerRouter = require('./searchPlayerRouter.r')
const rankRouter = require('./rankRouter.r')
const listclubsRouter = require('./listclubsRouter.r')
const resultRouter = require('./resultRouter.r')


function route(app){
    app.use('/auth', authRouter);
    app.use('/searchFootballPlayer', searchPlayerRouter);
    app.use('/rank', rankRouter)
    app.use('/listclubs', listclubsRouter)
    app.use('/result', resultRouter)
    app.use('/', homeRouter);

}

module.exports = route