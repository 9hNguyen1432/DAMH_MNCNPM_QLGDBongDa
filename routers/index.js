const homeRouter = require('./homeRouter')
const authRouter = require('./authRouter')
const searchPlayerRouter = require('./searchPlayerRouter.r')
const rankRouter = require('./rankRouter.r')
const listclubsRouter = require('./listclubsRouter.r')
const resultRouter = require('./resultRouter.r')
const manageRouter = require('./manageRouter.r')
const scheduleRouter = require('./scheduleRouter')
const detailClubRouter = require('./detailClubRouter.r')
const detailPlayerRouter = require('./detailPlayerRouter.r')
 
//app.use(upload.single())

function route(app){
    app.use('/auth', authRouter);
    app.use('/searchFootballPlayer', searchPlayerRouter);
    app.use('/detail-player', detailPlayerRouter)
    app.use('/rank', rankRouter)
    app.use('/listclubs', listclubsRouter)
    app.use('/detail-club', detailClubRouter)
    app.use('/schedule',scheduleRouter)
    app.use('/result', resultRouter)
    app.use('/manage', manageRouter)
    app.use('/', homeRouter);
}

module.exports = route