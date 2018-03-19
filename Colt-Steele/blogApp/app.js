const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//APP CONFIG
mongoose.connect('mongodb://localhost/blogApp')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

//MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
})

const Blog = mongoose.model('Blog', blogSchema)

/* Blog.create({
  title: 'Test Blog',
  image: 'https://images.pexels.com/photos/879824/pexels-photo-879824.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb',
  body: 'HELLO THIS IS A BLOG POST!!!'
}) */

//RESTFUL ROUTES
app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/blogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log('This is the error ', err)
    } else {
      res.render('index', {blogs: blogs})
    }
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
