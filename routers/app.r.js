const searchPlayerRouter = require('./searchPlayerRouter.r')
const homeRouter = require('./homeRouter.r')
const rankRouter = require('./rankRouter.r')
const listclubsRouter = require('./listclubsRouter.r')
const resultRouter = require('./resultRouter.r')


function route(app){
    app.use('/', homeRouter);
    app.use('/searchFootballPlayer', searchPlayerRouter);
    app.use('/rank', rankRouter)
    app.use('/listclubs', listclubsRouter)
    app.use('/result', resultRouter)
}

module.exports = route