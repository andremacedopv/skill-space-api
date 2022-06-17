const Event = require("../models/event");
const InvitedSpeaker = require("../models/invitedSpeaker");
const InvitedSpeakerEvent = require("../models/invitedSpeakerEvent");
const User = require('../models/user');
const Address = require('../models/address')
const EventFeedback = require('../models/eventFeedback')

const associateModels = (req, res, next) => {
  Event.belongsToMany(InvitedSpeaker, { through: InvitedSpeakerEvent })
  InvitedSpeaker.belongsToMany(Event, { through: InvitedSpeakerEvent });

  Address.hasOne(User, {
    foreignKey: 'addressId',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  User.belongsTo(Address);

  EventFeedback.belongsTo(User)
  EventFeedback.belongsTo(Event)

  next()
}

module.exports = associateModels