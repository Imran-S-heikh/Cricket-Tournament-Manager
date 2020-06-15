const express = require('express');
const tournamentRoute = require('./routes/tournament.route');

const app = express();

app.use(express.json());

app.use('/api/v1/tournaments', tournamentRoute);



module.exports = app;