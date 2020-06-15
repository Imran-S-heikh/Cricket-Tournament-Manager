const express = require('express');
const tournamentController = require('../controllers/Tournament.controller');



const router = express.Router();

router.route('/teams')
      .get(tournamentController.getTeams)
      .post(tournamentController.createTeam)

router.route('/teams/:id')
      .get(tournamentController.getTeam)
      // .post(tournamentController.de)

router.route('/')
      .get(tournamentController.getTournaments)
      .post(tournamentController.createTournament)

router.route('/:id')
      .get(tournamentController.getTournament)
// .delete(tournamentController.createTournament)  

module.exports = router;