const Event = require("../models/event");
const InvitedSpeaker = require("../models/invitedSpeaker");
const InvitedSpeakerEvent = require("../models/invitedSpeakerEvent");
const User = require('../models/user');
const Address = require('../models/address')
const Guest = require('../models/guest')
const EventFeedback = require('../models/eventFeedback')
const Activity = require('../models/activity')
const Category = require('../models/category')
const ActivityRequirement = require('../models/activityRequirement')
const ActivityType = require('../models/activityType')

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
  Guest.belongsTo(User);
  Event.hasMany(Guest, {
    foreignKey: 'eventId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Guest.belongsTo(Event);
  
  EventFeedback.belongsTo(User)
  EventFeedback.belongsTo(Event)
  Event.hasMany(EventFeedback)

  Activity.belongsToMany(Activity, {
    through: 'activityRequirements',
    as: 'requirement',
    foreignKey: 'activityId',
    otherKey: 'requirementId'
  })
  Activity.belongsToMany(Activity, {
    through: 'activityRequirements',
    as: 'dependents',
    foreignKey: 'requirementId',
    otherKey: 'activityId'
  })

  Category.hasMany(Activity, {
    foreignKey: 'categoryId',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  Activity.belongsTo(Category);

  Event.hasMany(Activity, {
    foreignKey: 'eventId',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  Activity.belongsTo(Event);

  ActivityType.hasMany(Activity, {
    foreignKey: 'activityTypeId',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  Activity.belongsTo(ActivityType);

  next()
}

module.exports = associateModels