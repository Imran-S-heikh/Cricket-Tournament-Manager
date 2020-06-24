const express = require('express');
const matchController = require('../controllers/Match.controller');
const authController = require('../controllers/Auth.controller');

const router = express.Router();

router.route('/')
      .get(matchController.getMatches)

router.route('/:id')
      .get(matchController.getMatch)
      .post(authController.protect, authController.umpireCheck, matchController.createMatch)
// .patch(matchController.updateMatch)

router.route('/over/:id')
      .patch(authController.protect, authController.umpireCheck, matchController.updateOver)
      .post(authController.protect, authController.umpireCheck, matchController.createOver)

router.route('/batsman/:id')
      .patch(authController.protect, authController.umpireCheck, matchController.updateBatsman)
      .post(authController.protect, authController.umpireCheck, matchController.createBatsman)

module.exports = router;