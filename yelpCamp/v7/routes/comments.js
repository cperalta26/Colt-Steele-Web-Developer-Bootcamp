const router = require('express').Router({mergeParams: true})
const Comment = require('../models/comment')
const Campground = require('../models/campground')

//Comments new
router.get('/new', isLoggedIn, (req, res) => {
  //find campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(`error: ${err}`)
    } else {
      res.render('comments/new', {campground})
    }
  })
})

//Comments create
router.post('/', isLoggedIn, (req, res) => {
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

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next()
  }
  res.redirect('/login')
}

module.exports = router
