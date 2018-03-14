const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/yelp_camp')

//Schema Setup

const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
})

const Campground = mongoose.model('Campground', campgroundSchema)

Campground.create(
  {
    name: 'Granite Hill',
    image: 'https://pixabay.com/get/e834b90621f6083ed95c4518b7444795ea76e5d004b0144395f4c77aa2ebb1_340.jpg',
    description: 'This is a huge granite hill, no bathrooms. No water.'
  },
  (err, campground) => {
    if (err) {
      console.log('This is the error ' + err)
    } else {
      console.log('Newly created campground: ')
      console.log(campground)
    }
  })

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
      res.render('campgrounds', {allCampgrounds})
    }
  })
})

//CREATE - add new campground to DB
app.post('/campgrounds', (req, res, next) => {
  const name = req.body.name
  const image = req.body.image
  const newCampground = {name, image}

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
  res.render('new')
})


app.listen(3000, () => {
  console.log('The YelpCamp Server Has Started on Version 2!')
})
