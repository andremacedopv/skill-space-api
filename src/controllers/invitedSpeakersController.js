const Event = require('../models/event');
const InvitedSpeaker = require('../models/invitedSpeaker')

exports.index = (req, res, next) => {
  InvitedSpeaker.findAll({include: Event})
  .then(invitedSpeakers => {
      res.json({ invitedSpeakers: invitedSpeakers });
  })
  .catch(e => {
      console.log(e)
      res.status(500).json({ error: e })
  })  
}

exports.create = (req, res, next) => {
  const invitedSpeaker = req.body;
  console.log(invitedSpeaker)
  InvitedSpeaker.create({
      name: invitedSpeaker.name,
      description: invitedSpeaker.description,
      job: invitedSpeaker.job,
  })
  .then(newInvitedSpeaker => {
    newInvitedSpeaker.setEvents(invitedSpeaker.events)
    return newInvitedSpeaker
  })
  .then(invitedSpeaker => {
      res.json({ invitedSpeaker: invitedSpeaker.dataValues });
  })
  .catch(e => {
      console.log(e)
      res.status(422).json({ error: e })
  }) 
}

exports.update = (req, res, next) => {
  const newInvitedSpeaker = req.body;
  InvitedSpeaker.findByPk(req.params.id)
  .then(invitedSpeaker => {
      invitedSpeaker.name = newInvitedSpeaker.name? newInvitedSpeaker.name : invitedSpeaker.name;
      invitedSpeaker.description = newInvitedSpeaker.description? newInvitedSpeaker.description : invitedSpeaker.description;
      invitedSpeaker.job = newInvitedSpeaker.job? newInvitedSpeaker.job : invitedSpeaker.job;
      newInvitedSpeaker.events && invitedSpeaker.setEvents(newInvitedSpeaker.events)
      return invitedSpeaker.save()
  })
  .then(response => {
      res.json({ invitedSpeaker: response.dataValues });
  })
  .catch(e => {
      console.log(e)
      res.status(422).json({ error: e })
  }) 
}

exports.show = (req, res, next) => {
  InvitedSpeaker.findByPk(req.params.id, {include: Event})
  .then(invitedSpeaker => {
      res.json({ invitedSpeaker: invitedSpeaker })
  })
  .catch(e => {
      console.log(e)
      res.status(422).json({ error: e })
  }) 
}

exports.delete = (req, res, next) => {
  InvitedSpeaker.findByPk(req.params.id)
  .then(invitedSpeaker => {
      return invitedSpeaker.destroy()
  })
  .then(response => {
      res.json({ message: 'Convidado deletado com sucesso' })
  })
  .catch(e => {
      console.log(e)
      res.status(422).json({ error: e })
  }) 
}
