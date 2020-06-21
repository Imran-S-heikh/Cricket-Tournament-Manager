const catchAsync = require('../utils/catch.async.error');
const Tournament = require('../models/Tournament.model');
const Player = require('../models/Player.model');

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
    const host = req.player.id;
    req.body.host = host;

    
    const newTournament = await Tournament.create(req.body);

    await Player.findByIdAndUpdate(host,{
        $set: {'tournaments.current': newTournament._id},
        $addToSet: {role: 'host','tournaments.all': newTournament._id}
    })

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

exports.updateTournament = catchAsync(async(req,res,next)=>{
    const tournamentId = req.tournament.id;
    const tournament = await Tournament.update({'_id':tournamentId,'teams.team': req.body.teamId},{'teams.$.status': 'approved'});

    res.status(200).json({
        status: 'success',
        data: {
            tournament
        }
    })
});