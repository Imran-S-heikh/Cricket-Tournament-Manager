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
        .populate([
            {path:[
                ...['overs.bowler',
                'batting.batsman',
                'playingEleven'].map(i=>'tossWonTeam.'+i),
                ...['playingEleven',
                'overs.bowler',
                'batting.batsman'].map(i=>'tossLoseTeam.'+i),
                'tournament umpires'
            ].join(' '),select: 'name'},
        ]);

    res.status(200).json({
        status: 'success',
        match
    });
});

exports.createMatch = catchAsync(async (req, res, next) => {
    const newMatch = await Match.create(req.body);

    res.status(200).json({
        status: 'success',
        match: newMatch
    });
});

exports.updateOver = catchAsync(async (req,res,next)=>{
    let updatedOver;
    const {id} = req.params;
    const {ball,team,overId} = req.body;
    const query = {'_id': id,[`${team}.overs._id`]:overId};
    const value = {$push: {[`${team}.overs.$.over`]: ball}};

    const updatedCollection = await Match.findOneAndUpdate(query,value,{new: true});
    updatedCollection[team].overs.forEach(el => {if(el.id === overId)updatedOver = el})

    res.status(200).json({
        status: 'success',
        data: {
            updatedOver: updatedOver
        }
    });
});

exports.createOver = catchAsync(async (req,res,next)=>{
    const {id} = req.params;
    const {over,team} = req.body;
    const path = `${team}.overs`;

    const newOver = await Match.findOneAndUpdate(id,{$push: {[path]:over}},{new: true});

    res.status(200).json({
        status: 'success',
        data: {
            newOver: newOver[team].overs.slice(-1)
        }
    });
});

exports.createBatsman = catchAsync(async (req,res,next)=>{
    const {id} = req.params;
    const {batting,team} = req.body;
    const path = `${team}.batting`;

    const newBatsman = await Match.findOneAndUpdate(id,{$push: {[path]:batting}},{new: true});

    res.status(200).json({
        status: 'success',
        data: {
            newBatsman: newBatsman[team].batting.slice(-1)
        }
    });
});

exports.updateBatsman = catchAsync(async (req,res,next)=>{
    let updatedScore;
    const {id} = req.params;
    const {score,team,scoreId} = req.body;
    const query = {'_id': id,[`${team}.batting._id`]:scoreId};
    const value = {$push: {[`${team}.batting.$.score`]: score}};

    const updatedCollection = await Match.findOneAndUpdate(query,value,{new: true});
    updatedCollection[team].batting.forEach(el => {if(el.id === scoreId)updatedScore = el})

    res.status(200).json({
        status: 'success',
        data: {
            updatedScore
        }
    });
});
