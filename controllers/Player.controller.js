const catchAsync = require('../utils/catch.async.error');
const Player = require('../models/Player.model');
const Team = require('../models/Team.model');
const Tournament = require('../models/Tournament.model');
const AppError = require('../utils/app.error');


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

exports.deletePlayer = catchAsync(async (req, res, next) => {
    await Player.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.joinTeam = catchAsync(async (req, res, next) => {
    const {id}  = req.player;
    await Player.findByIdAndUpdate(id,{status: 'pending'});
    const newTeam = await Team.findByIdAndUpdate(req.params.id,{ $addToSet: {players: [id]} },{new: true})

    res.status(200).json({
        status: 'success',
        data: {
            team: newTeam
        }
    })
});

exports.joinTournamentUmpire = catchAsync(async (req, res, next) => {
    const {id}  = req.player;
    await Player.findByIdAndUpdate(id,{status: 'pending'});
    const newTournament = await Tournament.findByIdAndUpdate(req.params.id,{ $push: {umpires: {umpire: id} }},{new: true})

    if(!newTournament)return next(new AppError('Invalid Tournament id',400));

    res.status(200).json({
        status: 'success',
        data: {
            tournament: newTournament
        }
    })
});