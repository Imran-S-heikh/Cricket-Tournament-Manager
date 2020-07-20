const express     = require('express');
const cookieParser =  require('cookie-parser');
var proxy = require('express-http-proxy');


const teamRoute   = require('./routes/team.route');
const playerRoute = require('./routes/player.route');
const matchRoute  = require('./routes/match.route');
const tournamentRoute = require('./routes/tournament.route');
const globalErrorHandler = require('./controllers/Error.controller');
const AppError = require('./utils/app.error');


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/tournaments', tournamentRoute);
app.use('/api/v1/players', playerRoute);
app.use('/api/v1/teams', teamRoute);
app.use('/api/v1/matches', matchRoute);

app.use('/', proxy('http://192.168.0.111:3000/',{
	proxyErrorHandler: (err,res,next)=>{
		console.log(err)
	}
}));

app.all('*',(req,res,next)=>{
    return next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

module.exports = app;
