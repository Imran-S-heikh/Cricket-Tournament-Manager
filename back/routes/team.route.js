const express = require('express');
const teamController = require('../controllers/Team.controller');
const authController = require('../controllers/Auth.controller');


const router = express.Router();

router.route('/')
      .get(teamController.getTeams)
      .post(authController.protect, teamController.createTeam)

router.route('/:id')
      .get(teamController.getTeam)

router.route('/join/:id')
      .post(authController.protect, authController.checkCaptain, teamController.joinTournament)

router.route('/delete/:id')
      .delete(authController.protect, teamController.deletePlayer);


// Team Captain Links

router.post('/accept/:playerId', authController.protect, authController.checkCaptain, teamController.acceptPlayer);

module.exports = router;