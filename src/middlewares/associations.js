const Event = require("../models/event");
const InvitedSpeaker = require("../models/invitedSpeaker");
const InvitedSpeakerEvent = require("../models/invitedSpeakerEvent");
const User = require('../models/user');
const Address = require('../models/address')
const Guest = require('../models/guest')
const EventFeedback = require('../models/eventFeedback')
const Post = require('../models/post')
const Tag = require('../models/tag')
const PostTag = require('../models/postTag')

const associateModels = (req, res, next) => {
  Event.belongsToMany(InvitedSpeaker, { through: InvitedSpeakerEvent });
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
  Event.hasMany(Guest, {
    foreignKey: 'eventId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Guest.belongsTo(User);
  Guest.belongsTo(Event);
  
  EventFeedback.belongsTo(User)
  EventFeedback.belongsTo(Event)
  Event.hasMany(EventFeedback)

  // NX1 Relation between Post and User
  Post.belongsTo(User)
  User.hasMany(Post, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // NXM Relation between Post and Tag
  Post.belongsToMany(Tag, {through: PostTag})
  Tag.belongsToMany(Post, {through: PostTag})

  next()
}

module.exports = associateModels