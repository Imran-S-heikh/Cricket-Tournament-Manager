const catchAsync = require('../utils/catch.async.error');
const Tournament = require('../models/Tournament.model');
const Player = require('../models/Player.model');
const AppError = require('../utils/app.error');

exports.getTournaments = catchAsync(async(req,res)=>{
    const tournaments = await Tournament.find();

    res.status(200).json({
        status: 'success',
        tournaments
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

const updatePlayer = async (id,tournamentId,role,status)=>{
    await Player.findByIdAndUpdate(id,{
        $set: {'tournaments.current': tournamentId,status},
        $addToSet: {role,'tournaments.all': tournamentId}
    });
}

exports.updateTournament = catchAsync(async(req,res,next)=>{
    const tournamentId = req.tournament.id;

    let query;
    let value;


    if (req.body.type === 'accept-team') {
        // Accept Team
        query = {'_id': tournamentId,'teams.team': req.body.id};
        value = {'teams.$.status': 'approved'};
    }else if(req.body.type === 'accept-umpire'){
        // Accept Umpire
        query = {'_id': tournamentId,'umpires.umpire': req.body.id};
        value = {'umpires.$.status': 'approved'};
    }else{
        //Default
        return next(new AppError('Please difine values correctly',400));
    }

    const tournament = await Tournament.updateOne(query,value);

    if (req.body.type === 'accept-umpire') {
        await updatePlayer(req.body.id,tournamentId,'umpire','busy');
    }

    res.status(200).json({
        status: 'success',
        data: {
            tournament
        }
    })
});
