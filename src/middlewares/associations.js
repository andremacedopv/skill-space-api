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
const Post = require('../models/post')
const Tag = require('../models/tag')
const PostTag = require('../models/postTag')
const Stage = require('../models/stage')
const StageUser = require('../models/stageUser')

const associateModels = (req, res, next) => {

  // NXM Relation between Event and InvitedSpeaker
  Event.belongsToMany(InvitedSpeaker, { through: InvitedSpeakerEvent });
  InvitedSpeaker.belongsToMany(Event, { through: InvitedSpeakerEvent });

  // 1X1 Relation between Address and User
  Address.hasOne(User, {
    foreignKey: 'addressId',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  User.belongsTo(Address);

  // NXM Relation between Event and Guest
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
  
  // NXM Relation between Event and User
  EventFeedback.belongsTo(User)
  EventFeedback.belongsTo(Event)
  Event.hasMany(EventFeedback)

  Activity.belongsToMany(Activity, {
    through: 'activityRequirements',
    as: { singular: 'requirement', plural: 'requirements' },
    foreignKey: 'activityId',
    otherKey: 'requirementId'
  })
  Activity.belongsToMany(Activity, {
    through: 'activityRequirements',
    as: { singular: 'dependent', plural: 'dependents' },
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

  // NX1 Relation between Post and User
  Post.belongsTo(User)
  User.hasMany(Post, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  // NXM Relation between Post and Tag
  Post.belongsToMany(Tag, {through: PostTag})
  Tag.belongsToMany(Post, {through: PostTag})

  // NX1 Relation between Activiy and Stage
  Activity.belongsTo(Stage)
  Stage.hasMany(Activity);

  // NXN Relation between Stage and Stage
  Stage.belongsToMany(Stage, {
    through: 'stageRequirements',
    as: { singular: 'requirement', plural: 'requirements' },
    foreignKey: 'stageId',
    otherKey: 'requirementId'
  })
  Stage.belongsToMany(Stage, {
    through: 'stageRequirements',
    as: { singular: 'dependent', plural: 'dependents' },
    foreignKey: 'requirementId',
    otherKey: 'stageId'
  })

  // NXM Relation between Stage and User
  User.belongsToMany(Stage, {through: StageUser})
  Stage.belongsToMany(User, {through: StageUser})

  next()
}

module.exports = associateModels