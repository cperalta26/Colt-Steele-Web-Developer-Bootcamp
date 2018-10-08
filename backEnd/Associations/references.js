const mongoose = require('mongoose'),
      Post = require('./models/post'),
      User = require('./models/user')

mongoose.connect('mongodb://localhost/blog_demo_2')

/* Post.create({
  title: 'How to cook the best burger pt.4',
  content: 'testing alksjdlfjsldakjfskdjfiuewiueie'
}, (err, post) => {
  if (err) {
    console.log(`error when creating a post: ${err}`)
  } else {
    User.findOne({email: 'bob@gmail.com'}, (err, foundUser) => {
      if (err) {
        console.log(`error: ${err}`)
      } else {
        foundUser.posts.push(post)
        foundUser.save((err, data) => {
          if (err) {
            console.log(`error after saving foundUser : ${err}`)
          } else {
            console.log(`newly created data: ${data}`)
          }
        })
      }
    })
  }
}) */

//Find user and all posts for that user
User.findOne({email: 'bob@gmail.com'}).populate('posts').exec((error, user) => {
  if (error) {
    console.log(`error: ${error}`)
  } else {
    console.log(`user: ${user}`)
  }
})
