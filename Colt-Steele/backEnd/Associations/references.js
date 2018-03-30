const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog_demo_2')

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
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
})

const User = mongoose.model('User', userSchema)

Post.create({
  title: 'How to cook the best burger pt.2',
  content: 'blah blah balsjdfklajsdfalskdfj alksdjf'
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
})
/* User.create({
  email: 'bob@gmail.com',
  name: 'Bob Belcher'
})
 */
