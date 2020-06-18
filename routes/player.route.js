const express = require('express');
const playerController = require('../controllers/Player.controller');
const { route } = require('./match.route');


const router = express.Router();

router.route('/')
      .get(playerController.getPlayers)
      .post(playerController.createPlayer)
      

router.route('/:id')
      .get(playerController.getPlayer)
      .delete(playerController.deletePlayer);
      
router.post('/join/:id',playerController.joinTeam);

module.exports = router;
