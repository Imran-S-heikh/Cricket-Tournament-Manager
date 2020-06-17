const express   = require('express');
const matchController = require('../controllers/Match.controller');

const router    = express.Router();

router.route('/')
      .get(matchController.getMatches)
      .post(matchController.createMatch)

router.route('/:id')
      .get(matchController.getMatch)
      .patch(matchController.updateMatch)

module.exports = router;