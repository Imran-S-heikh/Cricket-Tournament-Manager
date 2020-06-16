const catchAsync = require('../utils/catch.async.error');
const Player = require('../models/Player.model');


exports.getPlayers = catchAsync(async (req, res, next) => {
    const players = await Player.find();

    res.status(200).json({
        status: 'success',
        data: {
            players
        }
    })
});

exports.getPlayer = () => {

}

exports.createPlayer = catchAsync(async (req, res, next) => {
    const newPlayer = await Player.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            player: newPlayer
        }
    });
});

exports.deletePlayer = catchAsync(async (req, res, next) => {
    await Player.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
});