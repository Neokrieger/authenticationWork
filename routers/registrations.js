const express = require('express')
const router = express.Router({mergeParams: true})
const { User } = require('../models')
const bcrypt = require('bcryptjs');

router.get('/new', (req, res) => {
  res.render('registrations/new')
})

router.post('/', async (req, res) => {
  // Create a user with a hashed password using 'bcryptjs'

  const user = await User.create({
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password)
  })


  // Then store the user id in the session

  req.session.userId = user.id

  // Then redirect to '/top-secret'

    res.redirect('/top-secret')
})

module.exports = router
