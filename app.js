const express     = require('express');
const teamRoute   = require('./routes/team.route');
const playerRoute = require('./routes/player.route');
const matchRoute  = require('./routes/match.route');
const tournamentRoute = require('./routes/tournament.route');
const globalErrorHandler = require('./controllers/Error.controller');
const AppError = require('./utils/app.error');

const app = express();

app.use(express.json());

app.use('/api/v1/tournaments', tournamentRoute);
app.use('/api/v1/players', playerRoute);
app.use('/api/v1/teams', teamRoute);
app.use('/api/v1/matches', matchRoute);



app.all('*',(req,res,next)=>{
    return next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

module.exports = app;