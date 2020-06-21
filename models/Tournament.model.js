const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    host: {
        type: mongoose.ObjectId,
        require: true
    },
    umpires: [{
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'approved', 'busted']
        },
        umpire: {
            type: mongoose.Schema.ObjectId,
            ref: 'Player'
        }
    }],
    entryFee: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        require: true
    },
    finalDate: {
        type: Date,
        require: true
    },
    place: {
        type: String,
        require: true
    },
    firstPrize: {
        type: String,
        require: true
    },
    secondPrize: {
        type: String,
        required: true
    },
    teams: [
        {
            status: {
                type: String,
                default: 'pending',
                enum: ['pending','approved','busted']
            },
            team: {
                type: mongoose.Schema.ObjectId,
                ref: 'Team',
                unique: true
            }
        }
    ],
    thirdPrize: String,
    manOfTheMatch: String,
    manOfTheTournament: String
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;