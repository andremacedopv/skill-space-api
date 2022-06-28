const Event = require("../models/event");
const InvitedSpeaker = require("../models/invitedSpeaker");
const InvitedSpeakerEvent = require("../models/invitedSpeakerEvent");
const User = require('../models/user');
const Address = require('../models/address')
const Guest = require('../models/guest')
const EventFeedback = require('../models/eventFeedback')
const Activity = require('../models/activity')
const Category = require('../models/category')
const TagUser = require('../models/tagUser')
const ActivityType = require('../models/activityType')
const Post = require('../models/post')
const Tag = require('../models/tag')
const PostTag = require('../models/postTag')
const Reaction = require('../models/reaction')

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

  // NXM Relation between Activities
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

  // NX1 Relation between Category and Activities
  Category.hasMany(Activity, {
    foreignKey: 'categoryId',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  Activity.belongsTo(Category);

  // NX1 Relation between Event and Activities
  Event.hasMany(Activity, {
    foreignKey: 'eventId',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  Activity.belongsTo(Event);

  // NX1 Relation between Activity Type and Activities
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

  // NXM Relation between Users (Followers)
  User.belongsToMany(User, {
    through: 'followers',
    as: { singular: 'follow', plural: 'follows' },
    foreignKey: 'followerId',
    otherKey: 'followingId'
  })
  User.belongsToMany(User, {
    through: 'followers',
    as: { singular: 'following', plural: 'followings' },
    foreignKey: 'followingId',
    otherKey: 'followerId'
  })

  // NXM Relation between User and Tag
  User.belongsToMany(Tag, { through: TagUser });
  Tag.belongsToMany(User, { through: TagUser });

  // NXM Relation between User and Post (Reaction)
  User.belongsToMany(Post, {
    through: 'reactions',
    as: { singular: 'react', plural: 'reacts' },
    foreignKey: 'userId',
    otherKey: 'postId'
  })
  Post.belongsToMany(User, {
    through: 'reactions',
    as: { singular: 'reactor', plural: 'reactors' },
    foreignKey: 'postId',
    otherKey: 'userId'
  })

  next()
}

module.exports = associateModels