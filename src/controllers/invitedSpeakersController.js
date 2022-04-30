const Event = require('../models/event');
const InvitedSpeaker = require('../models/invitedSpeaker')

exports.index = (req, res, next) => {
  InvitedSpeaker.findAll()
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
  .then(invitedSpeaker => {
      Event.findByPk(1).then(e => {
          invitedSpeaker.addEvent(e)
          res.json({ invitedSpeaker: invitedSpeaker.dataValues });
      })
  })
  .catch(e => {
      console.log(e)
      res.status(422).json({ error: e })
  }) 
}

exports.update = (req, res, next) => {
  const newinvitedSpeaker = req.body;
  InvitedSpeaker.findByPk(req.params.id)
  .then(invitedSpeaker => {
      invitedSpeaker.name = newinvitedSpeaker.name? newinvitedSpeaker.name : invitedSpeaker.name;
      invitedSpeaker.description = newinvitedSpeaker.description? newinvitedSpeaker.description : invitedSpeaker.description;
      invitedSpeaker.job = newinvitedSpeaker.job? newinvitedSpeaker.job : invitedSpeaker.job;
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
  InvitedSpeaker.findByPk(req.params.id)
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
