const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    role: {
        type: [String],
        default: 'allrounder',
        enum: ['wicket-keeper', 'bats-man', 'bowler', 'allrounder', 'umpire', 'captain', 'host']
    },
    email: {
        type: String,
        required: [true, 'Player must have a email address'],
        unique: true
    },
    home: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'free-agent',
        enum: ['free-agent', 'pending', 'busy']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: {
            validator: function (val) {
                return val === this.password
            },
            message: 'Password did not match!'
        }
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    matches: {
        current: {
            type: mongoose.Schema.ObjectId,
            ref: 'Match'
        },
        all: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Match'
        }]
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
    },
    teams: {
        current: {
            type: mongoose.Schema.ObjectId,
            ref: 'Team'
        },
        all: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Team'
        }]
    }
});

playerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;

    next();
});

playerSchema.methods.checkPassword = async function (dbPassword, givenPassword) {
    return await bcrypt.compare(givenPassword, dbPassword);
}

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;