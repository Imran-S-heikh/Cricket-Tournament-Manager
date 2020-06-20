const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    players: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Player'   
        }
    ],
    captain: mongoose.Schema.ObjectId,
    status: {
        type: String,
        default: 'free-agent',
        enum: ['busy','pending','free-agent']
    }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;