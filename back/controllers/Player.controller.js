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

exports.getPlayer = catchAsync(async (req, res, next) => {
    const player = await Player.findById(req.params.id);

    if (!player) return next(new AppError('No Player Found', 404));

    res.status(200).json({
        status: 'success',
        player
    })
})

exports.deletePlayer = catchAsync(async (req, res, next) => {
    await Player.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.joinTeam = catchAsync(async (req, res, next) => {
    const { id } = req.player;
    const currentTeam = req.player.teams.current;

    const checkExist = await Team.findOne({ _id: req.params.id, 'players.player': id });

    if (checkExist) return next(new AppError('Player already exist', 401));

    const team = await Team.findByIdAndUpdate(req.params.id, { $addToSet: { players: { player: id } } }, { new: true });

    if (!team) return next(new AppError('Failed to join Team,Provide a valid Team ID', 400));

    await Player.findByIdAndUpdate(id, { status: 'pending' });

    if (currentTeam) {
        await Team.updateOne({ _id: currentTeam, 'players.player': id }, { $set: { 'players.$.status': 'leaved' } });
    }
    res.status(200).json({
        status: 'success',
        data: {
            team: team
        }
    })
});

exports.joinTournamentUmpire = catchAsync(async (req, res, next) => {
    const { id } = req.player;
    await Player.findByIdAndUpdate(id, { status: 'pending' });
    const newTournament = await Tournament.findByIdAndUpdate(req.params.id, { $push: { umpires: { umpire: id } } }, { new: true })

    if (!newTournament) return next(new AppError('Invalid Tournament id', 400));

    res.status(200).json({
        status: 'success',
        data: {
            tournament: newTournament
        }
    })
});