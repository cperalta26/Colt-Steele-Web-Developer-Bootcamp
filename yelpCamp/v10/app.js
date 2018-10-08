const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const methodOverride = require('method-override')
const User = require('./models/user')
const seedDB = require('./seeds')

//requiring routes
const campgroundRoutes = require('./routes/campgrounds')
const commentRoutes = require('./routes/comments')
const indexRoutes = require('./routes/index')

//seedDB()
mongoose.connect('mongodb://localhost/yelp_camp_v10')
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static(`${__dirname}/public`))
app.use(methodOverride('_method'))
app.use(flash())

//PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'Rusty is the  cutest',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//pass down current user to each route
app.use((req, res, next) => {
  res.locals.currentUser = req.user
  res.locals.error = req.flash('error')
  res.locals.success = req.flash('success')
  next()
})

app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/comments', commentRoutes)
app.use(indexRoutes)

app.listen(3000, () => {
  console.log('The YelpCamp Server Has Started on Version 10!')
})
