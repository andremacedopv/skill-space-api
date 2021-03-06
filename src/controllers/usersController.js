// Imports
const User = require('../models/user');
const Address = require('../models/address')
const Guest = require('../models/guest')
const Stage = require('../models/stage')
const { validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const StageUser = require('../models/stageUser');
const { requirements } = require('./activitiesController');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const user = req.body;
    bcrypt.hash(user.password, 12)
     .then(hashedPassword => {
        User.create({
            name: user.name,
            email: user.email,
            password: hashedPassword,
            cpf: user.cpf,
            ddd: user.ddd,
            phone: user.phone,
            birthdate: user.birthdate,
        })
        .then(newUser => {
            if(user.address) {
                Address.create({
                    country: user.address.country,
                    state: user.address.state,
                    city: user.address.city,
                    street: user.address.street,
                    neighborhood: user.address.neighborhood,
                    number: user.address.number
                })
                .then(address => {
                    newUser.setAddress(address)
                    return newUser
                })
                .catch(err => {
                    console.log(err)
                    res.status(422).json({error: err})
                })
            }
            return newUser
        })
        .then(newUser => {
            res.status(201).json({message: "User created", id: newUser.id})
        })
        .catch(err => {
            console.log(err)
            res.status(422).json({error: err})
        })
     })
     .catch(e => {
         if(!e.statusCode) {
             e.statusCode = 500;
         }
         next(e);
     })
}

exports.login = (req, res, next) => {
    const data = req.body;
    let loadedUser;
    User.findOne({ where: { email: data.email } })
    .then(user => {
        if (!user) {
            const error = new Error('User not found with provided email');
            error.statusCode = 401;
            throw error;
        }

        loadedUser = user;
        return bcrypt.compare(data.password, user.password); 
    })
    .then(match => {
        if(!match) {
            const error = new Error('Credentials invalid');
            error.statusCode = 401;
            throw error;
        }

        userObject = loadedUser.dataValues
        delete userObject.password
        const token = jwt.sign({user: userObject}, process.env.TKN_SECRET, {
            expiresIn: '3h'
        });
        res.status(200).json({token: token, user: userObject})
    })
    .catch(e => {
        if(!e.statusCode) {
            e.statusCode = 500;
        }
        next(e);
    })
}

exports.update = (req, res, next) => {
  const newUser = req.body
  const oldUser = req.user
  User.findByPk(oldUser.id)
  .then(user => {
    if(!user) throw new Error("Usu??rio n??o encontrado")
    user.name = newUser.name ? newUser.name : user.name
    user.ddd = newUser.ddd ? newUser.ddd : user.ddd
    user.phone = newUser.phone ? newUser.phone : user.phone
    return user.save()
  })
  .then(response => {
    let userLoaded = response.dataValues
    delete userLoaded.password
    res.json({user: userLoaded})
  })
  .catch(err => {
    console.log(err)
    res.status(422).json({error: err})
  })
}

exports.profile = (req, res, next) => {
    const userReq = req.user
    User.findByPk(userReq.id)
    .then(user => {
      if(!user) throw new Error("Usu??rio n??o encontrado")
      let userLoaded = user.dataValues
      delete userLoaded.password
      res.json({user: userLoaded})
    })
    .catch(err => {
      console.log(err)
      res.status(422).json({error: err})
    })
}

exports.show = (req, res, next) => {
    const userReq = req.user
    User.findByPk(req.params.id)
    .then(user => {
      if(!user) throw new Error("Usu??rio n??o encontrado")
      let userLoaded = user.dataValues
      delete userLoaded.password
      if(!userReq.admin) {
          delete userLoaded.ddd
          delete userLoaded.phone
          delete userLoaded.email
          delete userLoaded.cpf
          delete userLoaded.addressId
          delete userLoaded.owner
          delete userLoaded.is_active
      }
      res.json({user: userLoaded})
    })
    .catch(err => {
      console.log(err)
      res.status(422).json({error: err})
    })
}

exports.index = (req, res, next) => {
    User.scope('withoutPassword').findAll({include: [
        {model: Stage, as: 'stages', attributes: ['id', 'name']},
    ]})
    .then(users => {
      res.json({ users: users });
    })
    .catch(err => console.log(err))
}

exports.promote = (req, res, next) => {
    User.findByPk(req.params.id)
    .then(user => {
        if(!user) throw new Error("Usu??rio n??o encontrado")
        user.admin = true
        return user.save()
    })
    .then(response => {
        res.json({message: `${response.name} promoted to admin`})
    })
    .catch(err => {
      console.log(err)
      res.status(422).json({error: err})
    })
}

exports.demote = (req, res, next) => {
    User.findByPk(req.params.id)
    .then(user => {
        if(!user) throw new Error("Usu??rio n??o encontrado")
        user.admin = false
        return user.save()
    })
    .then(response => {
        res.json({message: `${response.name} demoted to regular user`})
    })
    .catch(err => {
      console.log(err)
      res.status(422).json({error: err})
    })
}

// Nas duas fun????es a seguir, colocar regra para somente o owner poder desativar um admin

exports.deactivate = (req, res, next) => {
    User.findByPk(req.params.id)
    .then(user => {
        if(!user) throw new Error("Usu??rio n??o encontrado")
        user.is_active = false
        return user.save()
    })
    .then(response => {
        res.json({message: `${response.name} deactivated`})
    })
    .catch(err => {
      console.log(err)
      res.status(422).json({error: err})
    })
}

exports.activate = (req, res, next) => {
    User.findByPk(req.params.id)
    .then(user => {
        if(!user) throw new Error("Usu??rio n??o encontrado")
        user.is_active = true
        return user.save()
    })
    .then(response => {
        res.json({message: `${response.name} activated`})
    })
    .catch(err => {
      console.log(err)
      res.status(422).json({error: err})
    })
}

exports.invitations = (req, res, next) => {
    const userReq = req.user
    User.scope('minimal').findByPk(userReq.id, { include: Guest })
    .then(user => {
      if(!user) throw new Error("Usu??rio n??o encontrado")
      res.json({invitations: user.guests})
    })
    .catch(err => {
      console.log(err)
      res.status(422).json({error: err})
    })
}

exports.addStage = async (req, res, next) => {
    const userId = req.body.user
    const stageId = req.body.stage

    try {
        const stageUser = await StageUser.findOne({where: {userId: userId, stageId: stageId}})
        if (stageUser) {
            const error = new Error('The user already have this stage');
            throw error;
        }

        const stage = await Stage.findByPk(stageId, { include: 
            [
                {model: Stage, as: 'requirements'},
            ]}
        )
        
        let error = false
        for (const requirement of stage.requirements) {
            const checkStageUser = await StageUser.findOne({where: {userId: userId, stageId: requirement.id}})
            if(!checkStageUser) error = true
        }

        if(error) throw new Error('The user does not have the required stages');

        await StageUser.create({stageId: stageId, userId: userId})
        res.json({message: "Stage added to User"})
    }
    catch(err) {
        res.status(422).json({error: err.toString()})
    }
}

exports.removeStage = async (req, res, next) => {
    const userId = req.body.user
    const stageId = req.body.stage

    try {
        const stageUser = await StageUser.findOne({where: {userId: userId, stageId: stageId}})
        if (!stageUser) {
            const error = new Error('The user does not have this stage');
            throw error;
        }
        await stageUser.destroy()
        
        res.json({message: "Stage removed from User"})
    }
    catch(err) {
        res.status(422).json({error: err.toString()})
    }
}
