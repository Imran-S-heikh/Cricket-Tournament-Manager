const catchAsync = require('../utils/catch.async.error');
const Tournament = require('../models/Tournament.model');

exports.getTournaments = catchAsync(async(req,res)=>{
    const tournaments = await Tournament.find();

    res.status(200).json({
        status: 'success',
        data: {
            tournaments
        }
    });
});

exports.createTournament = catchAsync( async (req,res)=>{
    const newTournament = await Tournament.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            tournament: newTournament
        }
    })
});

exports.getTournament = (req,res)=>{
    
}

exports.getTeams = (req,res)=>{
    
}

exports.createTeam = (req,res)=>{
    
}

exports.getTeam = (req,res)=>{
    
}