const router = require('express').Router()
const passport = require('passport')
const User = require('../models/user')

//root route
router.get('/', (req, res, next) => {
  res.render('landing')
})

//show register form
router.get('/register', (req, res) => {
  res.render('register')
})

//handle sign up logic
router.post('/register', (req, res) => {
  const newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(`error: ${err}`)
      return res.render('register')
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/campgrounds')
    })
  })
})

//show login form
router.get('/login', (req, res) => {
  res.render('login')
})

//handle login logic
router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }), (req, res) => {})

//handle logout logic
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/campgrounds')
})

module.exports = router
