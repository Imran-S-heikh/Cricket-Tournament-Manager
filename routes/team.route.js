const express = require('express');
const teamController = require('../controllers/Team.controller');


const router = express.Router();

router.route('/')
      .get(teamController.getTeams)
      .post(teamController.createTeam)

router.route('/:id')
      .get(teamController.getTeam)

router.route('/join/:id')
      .post(teamController.joinTournament)

router.route('/delete/:id')
      .delete(teamController.deletePlayer)

module.exports = router;