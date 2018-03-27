const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog_demo')

//defining 2 models users and posts

//POST - title, content
const postSchema = new mongoose.Schema({
  title: String,
  content: String
})

const Post = mongoose.model('Post', postSchema)

//USER - email, name
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
})

const User = mongoose.model('User', userSchema)

/* const newUser = new User({
  email: 'hermione@hogwarts.edu',
  name: 'Hermione Granger'
})

newUser.posts.push({
  title: 'How to bre polyjuice potion',
  content: 'Just kidding. Go to potions class to learn it!'
})

newUser.save((err, user) => {
  if (err) {
    console.log(`This is the error: ${err}`)
  } else {
    console.log(`This is the newly created user: ${user}`)
  }
}) */

/* const newPost = new Post({
  title: 'Reflections on Apples',
  content: 'They are delicios'
})

newPost.save((err, post) => {
  if (err) {
    console.log(`This is the error: ${err}`)
  } else {
    console.log(`This is the post that was just created ${post}`)
  }
}) */

User.findOne({name: 'Hermione Granger'}, (err, user) => {
  if (err) {
    console.log(`This is the error: ${err}`)
  } else {
    console.log(`The following user was found: ${user}`)
    user.posts.push({
      title: '3 things I really hate',
      content: 'Voldemort. Voldemort. Voldemort.'
    })
    user.save((err, user) => {
      if (err) console.log(`This is the error: ${err}`)
      else console.log(`This is the updated user: ${user}`)
    })
  }
})
