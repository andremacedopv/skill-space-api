const Event = require("../models/event");
const InvitedSpeaker = require("../models/invitedSpeaker");
const InvitedSpeakerEvent = require("../models/invitedSpeakerEvent");

const associateModels = (req, res, next) => {
  Event.belongsToMany(InvitedSpeaker, { through: InvitedSpeakerEvent })
  InvitedSpeaker.belongsToMany(Event, { through: InvitedSpeakerEvent });
  next()
}

module.exports = associateModels