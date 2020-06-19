const express = require('express');
const tournamentController = require('../controllers/Tournament.controller');
const authController       = require('../controllers/Auth.controller');



const router = express.Router();

// router.route('/teams')
//       .get(tournamentController.getTeams)
//       .post(tournamentController.joinTour)

router.route('/teams/:id')
      .get(tournamentController.getTeams)

router.route('/')
      .get(tournamentController.getTournaments)
      .post(authController.protect,tournamentController.createTournament)

router.route('/:id')
      .get(tournamentController.getTournament)
// .delete(tournamentController.createTournament)  

module.exports = router;