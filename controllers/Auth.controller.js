const jwt = require('jsonwebtoken');
const { promisify } = require('util')
const catchAsync = require('../utils/catch.async.error');
const { objSubtract } = require('../utils/filter.object');
const Player = require('../models/Player.model');
const AppError = require('../utils/app.error');

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
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 900000)
    });
    res.status(200).json({
        status: 'success',
        token,
        data: {
            player: newPlayer
        }
    });
});

exports.logIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new AppError('Please Provide email and password', 400));


    const player = await Player.findOne({ email }).select('password');
    if (!player || !await player.checkPassword(player.password, password)) {
        return next(new AppError('Incorrect email or password', 401));
    }

    const token = createToken(player._id);
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 900000)
    });
    res.status(200).json({
        status: 'success',
        token
    })
});

exports.protect = catchAsync(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return next(new AppError('Please login to access', 401));

    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);

    const currentPlayer = await Player.findById(decoded.id);

    if (!currentPlayer) return next(new AppError('Player Not found, Please Sign Up', 404));

    req.player = currentPlayer;
    next();
});

exports.umpireCheck = catchAsync(async(req,res,next)=>{
    const {role,tournaments} = req.player;

    //Check this is a umpire 
    if (!role.includes('umpire')) {
        return next(new AppError('Only a Umpire can update match',401));
    }

    // Check if Umpire Authorized by the Tournament
    if(tournaments.current !== req.params.id){
        return next(new AppError('You are not authorized in this tournament',401));
    }else if (tournaments.current !== req.body.tournament) {
        return next(new AppError('You are not authorized in this tournament',401));
    }

    next();
});