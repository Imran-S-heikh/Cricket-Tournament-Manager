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

    req.user = {id: decoded.id}
    next();
});