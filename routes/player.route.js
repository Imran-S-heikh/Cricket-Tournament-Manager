const express = require('express');
const playerController = require('../controllers/Player.controller');
const authController   = require('../controllers/Auth.controller');


const router = express.Router();

router.route('/')
      .get(playerController.getPlayers)
      

router.route('/:id')
      .get(playerController.getPlayer)
      .delete(playerController.deletePlayer);
      
router.post('/join/:id',playerController.joinTeam);

router.post('/signup',authController.signUp);
router.post('/login',authController.logIn);

module.exports = router;
