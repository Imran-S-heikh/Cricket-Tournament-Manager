const express     = require('express');
const teamRoute   = require('./routes/team.route');
const playerRoute = require('./routes/player.route');
const tournamentRoute = require('./routes/tournament.route');

const app = express();

app.use(express.json());

app.use('/api/v1/tournaments', tournamentRoute);
app.use('/api/v1/players', playerRoute);
app.use('/api/v1/teams', teamRoute);



module.exports = app;