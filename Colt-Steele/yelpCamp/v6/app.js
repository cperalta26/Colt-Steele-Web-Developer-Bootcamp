const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const Campground = require('./models/campground')
const Comment = require('./models/comment')
const User = require('./models/user')
const seedDB = require('./seeds')

seedDB()
mongoose.connect('mongodb://localhost/yelp_camp_v6')
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static(`${__dirname}/public`))

//PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'Rusty is the cutest',
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
  next()
})

app.get('/', (req, res, next) => {
  res.render('landing')
})

//INDEX - show all campgrounds
app.get('/campgrounds', (req, res, next) => {
  //Get all campground from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log('This is the error ' + err)
    } else {
      res.render('campgrounds/index', {allCampgrounds, currentUser: req.user})
    }
  })
})

//CREATE - add new campground to DB
app.post('/campgrounds', (req, res, next) => {
  const name = req.body.name
  const image = req.body.image
  const description = req.body.description
  const newCampground = {name, image, description}

  //Create a new campground and save it to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log('This is the error ' + err)
    } else {
      console.log('Campground was created ' + newlyCreated)
      res.redirect('/campgrounds')
    }
  })
})

//NEW - show form to create new campground
app.get('/campgrounds/new', (req, res, next) => {
  res.render('campgrounds/new')
})

//SHOW - shows more info about one campground
app.get('/campgrounds/:id', (req, res, next) => {
  //find the campground with provided ID
  const campId = req.params.id
  Campground.findById(campId).populate('comments').exec( (err, foundCampground) => {
    if (err) {
      console.log('This is the error ' + err)
    } else {
      //render show template with that campground
      res.render('campgrounds/show', {foundCampground})
    }
  })
})

// ===========================
// COMMENTS
// ===========================
app.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
  //find campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(`error: ${err}`)
    } else {
      res.render('comments/new', {campground})
    }
  })
})

app.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
  //lookup campground using ID
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(`error: ${err}`)
      res.redirect('/campgrounds')
    } else {
      //create new comment
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(`error: ${err}`)
        } else {
          //connect new comment to campground
          campground.comments.push(comment)
          campground.save()
          //redirect campground show page
          res.redirect(`/campgrounds/${campground._id}`)
        }
      })
    }
  })
})

//===========================
//AUTH ROUTES
//===========================
/* show register form */
app.get('/register', (req, res) => {
  res.render('register')
})

/* handle sign up logic */
app.post('/register', (req, res) => {
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

/* show login form */
app.get('/login', (req, res) => {
  res.render('login')
})

/* handle login logic */
app.post('/login', passport.authenticate('local',
  {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }), (req, res) => {})

/* handle logout logic*/
app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/campgrounds')
})

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next()
  }
  res.redirect('/login')
}

app.listen(3000, () => {
  console.log('The YelpCamp Server Has Started on Version 6!')
})
