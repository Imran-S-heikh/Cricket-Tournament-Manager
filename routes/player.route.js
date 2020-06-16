const express = require('express');
const playerController = require('../controllers/Player.controller');


const router = express.Router();

router.route('/')
      .get(playerController.getPlayers)
      .post(playerController.createPlayer)
      

router.route('/:id')
      .get(playerController.getPlayer)
      .delete(playerController.deletePlayer)    

module.exports = router;
