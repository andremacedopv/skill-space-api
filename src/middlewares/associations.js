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
const Stage = require('../models/stage')
const StageUser = require('../models/stageUser')
const Reaction = require('../models/reaction')
const ActivityUser = require('../models/activityUser')
const ActivityFeedback = require('../models/activityFeedback')
const ActivitySubmission = require('../models/activitySubmission')
const Message = require('../models/message')
const Chat = require('../models/chat')
const ChatUser = require('../models/chatUser')
const Permission = require('../models/permission')
const AdminPermission = require('../models/adminPermission')

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

  // 1XN Relation between User and reaction
  User.hasMany(Reaction, {
    as: { singular: 'act', plural: 'acts' },
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Reaction.belongsTo(User);

  // 1XN Realation between Post and reaction
  Post.hasMany(Reaction, {
    as: { singular: 'reacted', plural: 'reacteds' },
    foreignKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Reaction.belongsTo(Post);

  // 1XN relationship between ActivityUser and Activity
  Activity.hasMany(ActivityUser, {
    foreignKey: 'activityId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  ActivityUser.belongsTo(Activity);

  // 1XN relationship between ActivityUser and User
  User.hasMany(ActivityUser, {
    as: { singular: 'owner', plural: 'owners' },
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  ActivityUser.belongsTo(User);

  // 1X1 relationship between ActivityUser and Post
  Post.hasOne(ActivityUser, {
    foreignKey: 'postId',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  ActivityUser.belongsTo(Post);

  // 1X1 relationship between ActivityUser and ActivitySubmission
  ActivitySubmission.hasOne(ActivityUser, {
    foreignKey: 'activitySubmissionId',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  ActivityUser.belongsTo(ActivitySubmission);

  // 1X1 relationship between ActivityUser and ActivityFeedback
  ActivityFeedback.hasOne(ActivityUser, {
    foreignKey: 'activityFeedbackId',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  ActivityUser.belongsTo(ActivityFeedback);

  // NX1 relationship between User and ActivityFeedback
  User.hasMany(ActivityFeedback, {
    as: { singular: 'reviewer', plural: 'reviewers' },
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  ActivityFeedback.belongsTo(User);
  // 1XN Relation between User and Message
  User.hasMany(Message, {
    foreignKey: 'userId',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  Message.belongsTo(User);

  // 1XN Relation between Chat and Message
  Chat.hasMany(Message, {
    foreignKey: 'chatId',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  Message.belongsTo(Chat);

  // NXM Relation between Chat and User
  Chat.belongsToMany(User, { through: ChatUser });
  User.belongsToMany(Chat, { through: ChatUser });

  // NXM Relation between User and Permission
  Permission.belongsToMany(User, { through: AdminPermission });
  User.belongsToMany(Permission, { through: AdminPermission });

  next()
}

module.exports = associateModels