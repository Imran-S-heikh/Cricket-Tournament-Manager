const express = require('express');
const matchController = require('../controllers/Match.controller');

const router = express.Router();

router.route('/')
      .get(matchController.getMatches)
      .post(matchController.createMatch)

router.route('/:id')
      .get(matchController.getMatch)
      // .patch(matchController.updateMatch)

router.route('/over/:id')
      .patch(matchController.updateOver)
      .post(matchController.createOver)

router.route('/batsman/:id')
      .patch(matchController.updateBatsman)
      .post(matchController.createBatsman)

module.exports = router;