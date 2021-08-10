const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts');

const { User } = require('./models')

const registrationsRouter = require('./routers/registrations.js')
const sessionsRouter = require('./routers/sessions.js')

app.set('view engine', 'ejs')

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'super top secret',
  resave: false,
  saveUninitialized: true,
}))

app.use(async (req, res, next) => {
  if (req.session.userId) {
    res.locals.currentUser = await User.findOne({
      where: {
        id: req.session.userId
      }
    })
  } else {
    res.locals.currentUser = undefined
  }
  res.locals.errors = []
  next()
})

const authenticator = (req, res, next) => {
  if (req.session.userId === undefined) {
    res.redirect('/')
  } else {
    next()
  }
}

app.use('/registrations', registrationsRouter)

app.use('/sessions', sessionsRouter)

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/top-secret', authenticator, (req, res) => {
  res.render('top-secret')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
