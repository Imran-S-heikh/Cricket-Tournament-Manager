const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
        default: 'allrounder',
        enum: ['wicket-keeper','bats-man','bowler','allrounder','umpire','captain']
    },
    email: {
        type: String,
        required: true
    },
    home: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'free-agent',
        enum: ['free-agent','pending','busy']
    } 
});

const Player = mongoose.model('Player',playerSchema);

module.exports = Player;