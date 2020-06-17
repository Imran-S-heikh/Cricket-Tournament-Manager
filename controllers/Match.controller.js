const catchAsync = require("../utils/catch.async.error");
const Match = require("../models/Match.model");


exports.getMatches = catchAsync(async (req, res, next) => {
    const matches = await Match.find();

    res.status(200).json({
        status: 'success',
        data: {
            matches
        }
    });
});

exports.getMatch = catchAsync(async (req, res, next) => {
    const match = await Match.findById(req.params.id)
        .populate({ 
            path: 'tossLoseTeam',
            populate: {
                path: 'playingEleven',
                model: 'Player',
                select: 'name'
            }
         })
        .populate({ 
            path: 'tossWonTeam',
            populate: {
                path: 'playingEleven',
                model: 'Player',
                select: 'name'
            }
         })
         .populate({ 
            path: 'tossWonTeam',
            populate: {
                path: 'batting',
                populate: {
                    path: 'batsman',
                    model: 'Player',
                    select: 'name'
                }
            }
         })
        .populate({ path: 'Overs.bowler', select: 'name' })
        .populate({ path: 'batting.batsman', select: 'name' })
        .populate({ path: 'tournament', select: 'name' })
        .populate({ path: 'umpires', select: 'name' })
        .populate({ path: 'toss.tossWon', select: 'name' });

    res.status(200).json({
        status: 'success',
        data: {
            match
        }
    });
});

exports.createMatch = catchAsync(async (req, res, next) => {
    const newMatch = await Match.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            match: newMatch
        }
    });
});

exports.updateMatch = catchAsync(async (req, res, next) => {
    const newMatch = await Match.findByIdAndUpdate(req.params.id,req.body, { new: true });
    console.log(req.body.id)
    res.status(200).json({
        status: 'success',
        data: {
            match: newMatch
        }
    });
});