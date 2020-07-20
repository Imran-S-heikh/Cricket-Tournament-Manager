const express = require('express');
const tournamentController = require('../controllers/Tournament.controller');
const authController = require('../controllers/Auth.controller');
const playerController = require('../controllers/Player.controller');



const router = express.Router();

// router.route('/teams')
//       .get(tournamentController.getTeams)
//       .post(tournamentController.joinTour)

router.route('/teams/:id')
      .get(tournamentController.getTournamentTeams)

router.route('/')
      .get(tournamentController.getTournaments)
      .post(authController.protect, tournamentController.createTournament)
      .patch(authController.protect,authController.checkHost,tournamentController.updateTournament);

router.route('/join/:id')
      .post(authController.protect, playerController.joinTournamentUmpire);

router.route('/:id')
      .get(tournamentController.getTournament)
// .delete(tournamentController.createTournament)  

module.exports = router;