const mongoose = require('mongoose');

const matchTeamSchema = mongoose.Schema({
    playingEleven: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Player'
    }],
    Overs: [
        {
            bowler: {
                type: mongoose.Schema.ObjectId,
                ref: 'Player'
            },
            over: [String]
        }
    ],
    batting: [
        {
            batsman: {
                type: mongoose.Schema.ObjectId,
                ref: 'Player'
            },
            score: [String]
        }
    ],
    extra: {
        batting: [String],
        bowling: [String]
    }
});


const matchSchema = new mongoose.Schema({
    tournament: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tournament'
    },
    umpires: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Player'
    }],
    toss: {
        tossWon: {
            type: mongoose.Schema.ObjectId,
            ref: 'Team'
        },
        electedTo: {
            type: String,
            enum: ['bat', 'ball']
        }
    },
    tossWonTeam: {
        playingEleven: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Player'
        }],
        overs: [
            {
                bowler: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Player'
                },
                over: [String]
            }
        ],
        batting: [
            {
                batsman: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Player'
                },
                score: [String]
            }
        ],
        extra: {
            batting: [String],
            bowling: [String]
        }
    },
    tossLoseTeam: {
        playingEleven: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Player'
        }],
        overs: [
            {
                bowler: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Player'
                },
                over: [String]
            }
        ],
        batting: [
            {
                batsman: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Player'
                },
                score: [String]
            }
        ],
        extra: {
            batting: [String],
            bowling: [String]
        }
    }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;