const Event = require("../models/event");
const InvitedSpeaker = require("../models/invitedSpeaker");
const InvitedSpeakerEvent = require("../models/invitedSpeakerEvent");
const User = require('../models/user');
const Address = require('../models/address')
const Guest = require('../models/guest')

const associateModels = (req, res, next) => {
  Event.belongsToMany(InvitedSpeaker, { through: InvitedSpeakerEvent })
  InvitedSpeaker.belongsToMany(Event, { through: InvitedSpeakerEvent });

  Address.hasOne(User, {
    foreignKey: 'addressId',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  User.belongsTo(Address);

  User.hasMany(Guest, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Guest.belongsTo(User);
  Event.hasMany(Guest, {
    foreignKey: 'eventId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Guest.belongsTo(Event);

  next()
}

module.exports = associateModels