const catchAsync = require('../utils/catch.async.error');
const Player = require('../models/Player.model');
const { objSubtract } = require('../utils/filter.object');
const Team = require('../models/Team.model');


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
    const filteredPlayer = objSubtract(req.body,'status')
    const newPlayer = await Player.create(filteredPlayer);

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

exports.joinTeam = catchAsync(async (req, res, next) => {
    await Player.findByIdAndUpdate(req.body.id,{status: 'pending'});
    const newTeam = await Team.findByIdAndUpdate(req.params.id,{ $addToSet: {players: [req.body.id]} },{new: true})

    res.status(200).json({
        status: 'success',
        data: {
            team: newTeam
        }
    })
});