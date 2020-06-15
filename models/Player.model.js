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
        enum: ['wicket-keeper','bats-man','bowler','allrounder']
    },
    email: {
        type: String,
        required: true
    },
    home: {
        type: String,
        required: true
    } 
});

const Player = mongoose.model('Player',playerSchema);

module.exports = Player;