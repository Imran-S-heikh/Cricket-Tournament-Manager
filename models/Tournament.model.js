const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    host: {
        type: String,
        require: true
    },
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
    thirdPrize: String,
    manOfTheMatch: String,
    manOfTheTournament: String
});

const Tournament = mongoose.model('Tournament',tournamentSchema);

module.exports = Tournament;