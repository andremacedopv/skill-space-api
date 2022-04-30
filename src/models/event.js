// Imports
const db = require('../services/database')
const sequelize = require('sequelize');
const InvitedSpeaker = require('./invitedSpeaker');
const InvitedSpeakerEvent = require('./invitedSpeakerEvent');

// Model definition
const Event = db.define('event', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    description: {
        type: sequelize.TEXT,
        allowNull: false
    },
    date: {
        type: sequelize.DATE,
        allowNull: false
    },
    remote: {
        type: sequelize.BOOLEAN,
        allowNull: false
    },
    link: {
        type: sequelize.STRING,
        allowNull: false
    }
});

Event.belongsToMany(InvitedSpeaker, { through: InvitedSpeakerEvent })
InvitedSpeaker.belongsToMany(Event, { through: InvitedSpeakerEvent });

module.exports = Event;
