const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Campground = require('./models/campground')
const seedDB = require('./seeds')

seedDB()
mongoose.connect('mongodb://localhost/yelp_camp_v3')

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

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
      res.render('campgrounds/index', {allCampgrounds})
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
app.get('/campgrounds/:id/comments/new', (req, res) => {
  //find campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(`error: ${err}`)
    } else {
      res.render('comments/new', {campground})
    }
  })
})

app.listen(3000, () => {
  console.log('The YelpCamp Server Has Started on Version 4!')
})
