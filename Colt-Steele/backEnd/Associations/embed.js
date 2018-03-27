const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog_demo')

//defining 2 models users and posts

//USER - email, name
const userSchema = new mongoose.Schema({
  email: String,
  name: String
})

const User = mongoose.model('User', userSchema)

//POST - title, content
const postSchema = new mongoose.Schema({
  title: String,
  content: String
})

const Post = mongoose.model('Post', postSchema)

const newUser = new User({
  email: 'charlie@brown.edu',
  name: 'Charlie Brown'
})

/* newUser.save((err, user) => {
  if (err) {
    console.log(`This is the error: ${err}`)
  } else {
    console.log(`This is the newly created user: ${user}`)
  }
}) */

const newPost = new Post({
  title: 'Reflections on Apples',
  content: 'They are delicios'
})

/* newPost.save((err, post) => {
  if (err) {
    console.log(`This is the error: ${err}`)
  } else {
    console.log(`This is the post that was just created ${post}`)
  }
}) */
