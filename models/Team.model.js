const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    players: [
        {
            status: {
                type: String,
                default: 'pending',
                enum: ['pending','approved','busted','leaved']
            },
            player: {
                type: mongoose.Schema.ObjectId,
                ref: 'Player'
            }
        }
    ],
    captain: mongoose.Schema.ObjectId,
    status: {
        type: String,
        default: 'free-agent',
        enum: ['busy','pending','free-agent']
    },
    tournaments: {
        current: {
            type: mongoose.Schema.ObjectId,
            ref: 'Tournament'
        },
        all: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Tournament'
        }]
    }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;