const express = require('express')
const router = express.Router({mergeParams: true})
const { User } = require('../models')
// require module 'bcryptjs'
const bcrypt = require('bcryptjs')

router.get('/new', (req, res) => {
  res.render('sessions/new')
})

router.post('/', async (req, res) => {
  // find user by email
  const user = await User.findOne({
    where:{
      email: req.body.email
    }
  })


  // if user exists, and using bcryptjs the password is equal to the password in the request body
  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    req.session.userId = user.id
    // add user id to the session
    // redirect to '/top-secret'
    res.redirect('/top-secret')
  }
  else {
    // render the same sign in form, with the error message
    res.render('sessions/new', { errors: ["sorry, details not valid"] })
  }
})

router.delete('/', (req, res) => {
  // delete the user id from the session
  req.session.userId = undefined
  res.redirect('/')
})

module.exports = router
