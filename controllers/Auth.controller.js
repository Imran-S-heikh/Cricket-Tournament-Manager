const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catch.async.error');
const { objSubtract } = require('../utils/filter.object');
const Player = require('../models/Player.model');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

exports.signUp = catchAsync(async (req, res, next) => {
    const filteredPlayer = objSubtract(req.body, 'status')
    const newPlayer = await Player.create(filteredPlayer);

    newPlayer.password = undefined;
    
    const token = createToken(newPlayer._id);

    res.status(200).json({
        status: 'success',
        token,
        data: {
            player: newPlayer
        }
    });
});