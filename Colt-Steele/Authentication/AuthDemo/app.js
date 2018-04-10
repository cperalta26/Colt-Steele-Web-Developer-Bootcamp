const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const User = require('./models/user')

mongoose.connect('mongodb://localhost/auth_demo_app')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(require('express-session')({
  secret: "You can't see me...I'm a flower",
  resave: false,
  saveUninitialized: false
}))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//=====================
//ROUTES
//=====================
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/secret', (req, res) => {
  res.render('secret')
})

//Auth Routes
/* show sign up form */
app.get('/register', (req, res) => {
  res.render('register')
})

/* handling user sign up */
app.post('/register', (req, res) => {
  User.register(new User({username: req.body.username}), req.body.password, (err, newUser) => {
    if (err) {
      console.log(`error: ${err}`)
      return res.render('register')
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/secret')
    })
  })
})

app.listen(3000, () => {
  console.log('Now listening on port 3000!!!')
})
