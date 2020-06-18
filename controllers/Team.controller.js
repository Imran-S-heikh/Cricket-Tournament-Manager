const catchAsync = require('../utils/catch.async.error');
const Team = require('../models/Team.model');
const Player = require('../models/Player.model');
const Tournament = require('../models/Tournament.model');


exports.createTeam = catchAsync(async (req, res, next) => {
    await Player.findByIdAndUpdate(req.body.id,{$set: {status: 'pending',role: 'captain'}})
    const newTeam = await Team.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            team: newTeam
        }
    })
});


exports.getTeams = catchAsync(async (req, res, next) => {
    const teams = await Team.find().populate('players');

    res.status(200).json({
        status: 'success',
        data: {
            teams
        }
    })
});


exports.getTeam = catchAsync(async (req, res, next) => {
    // const newTeam = await Team.create(req.body);

    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         team: newTeam
    //     }
    // })
});


exports.joinTournament = catchAsync( async (req,res)=>{
    const {id} = req.params;
    const {ownId} = req.body;
    await Team.findByIdAndUpdate(ownId,{$set: {status: 'pending'}})
    const newTournament =await Tournament.findByIdAndUpdate(id,{ $addToSet: {teams: [ownId]} },{new: true})


    res.status(200).json({
        status: 'success',
        data: {
            tournament: newTournament
        }
    })
});


exports.deletePlayer = catchAsync(async (req, res, next) => {
    await Team.findByIdAndUpdate(req.params.id,{ $pull: {players: req.body.id } })

    res.status(204).json({
        status: 'success',
        data: {
            data:null
        }
    })
});