const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    players: [
        {
            type: mongoose.Schema.ObjectId,
            unique: true,
            ref: 'Player'
        }
    ]
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;