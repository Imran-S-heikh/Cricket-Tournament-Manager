const jwt = require('jsonwebtoken');
const { promisify } = require('util')
const catchAsync = require('../utils/catch.async.error');
const { objFilter } = require('../utils/filter.object');
const Player = require('../models/Player.model');
const AppError = require('../utils/app.error');
const Team = require('../models/Team.model');
const Tournament = require('../models/Tournament.model');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

exports.signUp = catchAsync(async (req, res, next) => {

    const fields = ['name', 'email', 'home', 'password', 'confirmPassword'];

    const filteredPlayer = objFilter(req.body, ...fields);
    const newPlayer = await Player.create(filteredPlayer);

    newPlayer.password = undefined;

    const token = createToken(newPlayer._id);
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 900000),
        sameSite: 'strict'
    });
    res.status(200).json({
        status: 'success',
        token,
        player: newPlayer
    });
});

exports.logIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new AppError('Please Provide email and password', 400));


    const player = await Player.findOne({ email }).select('+password');
    if (!player || !await player.checkPassword(player.password, password)) {
        return next(new AppError('Incorrect email or password', 401));
    }

    const token = createToken(player._id);
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 900000),
        sameSite: 'strict'
    });

    player.password = undefined;

    res.status(200).json({
        status: 'success',
        token,
        player
    })
});

exports.protect = catchAsync(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return next(new AppError('Please login to access', 401));

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentPlayer = await Player.findById(decoded.id);

    if (!currentPlayer) return next(new AppError('Player Not found, Please Sign Up', 404));

    req.player = currentPlayer;
    next();
});

exports.umpireCheck = catchAsync(async (req, res, next) => {
    const { role, tournaments, status } = req.player;
    const tournamentId = req.params.id;

    //Check this is a umpire 
    if (!role.includes('umpire')) {
        return next(new AppError('Only a Umpire can update match', 401));
    }

    // Check if Umpire Authorized by the Tournament
    if (tournaments.current !== tournamentId || status !== 'approved') {
        return next(new AppError('You are not authorized in this tournament', 401));
    }

    req.body.tournament = tournamentId;
    next();
});

exports.checkCaptain = catchAsync(async (req, res, next) => {
    const { teamId } = req.body;
    const { role, id } = req.player;

    if (!role.includes('captain')) return next(new AppError('You are not Captain', 401));

    const team = await Team.findById(teamId);

    if (!team) return next(new AppError('No team found', 404));
    if (team.captain != id) return next(new AppError('Only team captain can do this', 401));

    req.team = team;
    next();
});



exports.checkHost = catchAsync(async (req, res, next) => {
    const { role, id } = req.player;
    const tournamentId = req.player.tournaments.current;

    if (!role.includes('host')) return next(new AppError('You are not Host', 401));

    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) return next(new AppError('No tournament found', 404));
    if (tournament.host != id) return next(new AppError('Only tournament host can do this', 401));

    req.tournament = tournament;
    next();
});