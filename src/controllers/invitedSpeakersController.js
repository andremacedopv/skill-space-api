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
  InvitedSpeaker.create({
      name: invitedSpeaker.name,
      description: invitedSpeaker.description,
      date: invitedSpeaker.date,
      remote: invitedSpeaker.remote,
      link: invitedSpeaker.link
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
  const newinvitedSpeaker = req.body;
  InvitedSpeaker.findByPk(req.params.id)
  .then(invitedSpeaker => {
      invitedSpeaker.name = newinvitedSpeaker.name? newinvitedSpeaker.name : invitedSpeaker.name;
      invitedSpeaker.description = newinvitedSpeaker.description? newinvitedSpeaker.description : invitedSpeaker.description;
      invitedSpeaker.date = newinvitedSpeaker.date? newinvitedSpeaker.date : invitedSpeaker.date;
      invitedSpeaker.remote = newinvitedSpeaker.remote? newinvitedSpeaker.remote : invitedSpeaker.remote;
      invitedSpeaker.link = newinvitedSpeaker.link? newinvitedSpeaker.link : invitedSpeaker.link;
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
