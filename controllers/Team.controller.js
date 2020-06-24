const catchAsync = require('../utils/catch.async.error');
const Team = require('../models/Team.model');
const Player = require('../models/Player.model');
const Tournament = require('../models/Tournament.model');
const AppError = require('../utils/app.error');
const {objFilter} = require('../utils/filter.object');


exports.createTeam = catchAsync(async (req, res, next) => {
    const filteredTeam = objFilter(req.body,'name');

    req.body.captain = req.player.id; 

    const newTeam = await Team.create(filteredTeam);
    await Player.findByIdAndUpdate(req.player.id,{$addToSet: {role: 'captain','teams.all': newTeam._id},$set: {status: 'busy','teams.current': newTeam._id}})

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


exports.joinTournament = catchAsync( async (req,res,next)=>{
    const tournamentId = req.params.id;
    const {id} = req.team;

    const tournament = await Tournament.findById(tournamentId);
    
    const arr = tournament.teams.map((el)=> el.team == id);

    if (arr.includes(true)) return next(new AppError('Team already exist',400));

    await Team.findByIdAndUpdate(id,{
        $set: {status: 'pending','tournaments.current': tournamentId},
        $addToSet: {'tournaments.all': tournamentId}
    })
    const newTournament = await Tournament.findByIdAndUpdate(tournamentId,{$addToSet: {teams: {team: id}}},{new: true})


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

exports.acceptPlayer = catchAsync(async(req,res,next)=>{
    console.log('called')
    const playerId = req.params.playerId;
    const teamId  = req.team.id;

    const team = await Team.updateOne({_id: teamId,'players.player': playerId},{$set: {'players.$.status': 'approved','players.$.player': playerId}});

    if(!team) return next('Team update failed,Please provide a valid PlayerID',400);

    await Player.findByIdAndUpdate(playerId,{$set: {status: 'busy','teams.current': teamId}, $addToSet: {'teams.all': teamId}});

    res.status(200).json({
        status: 'success',
        data: team
    });

});