const catchAsync = require('../utils/catch.async.error');
const Tournament = require('../models/Tournament.model');

exports.getTournaments = (req,res)=>{
    res.status(200).json({
        status: 'success'
    })
}

exports.createTournament = catchAsync( async (req,res)=>{
    console.log(req.body);
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