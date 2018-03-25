const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const expressSanitizer = require('express-sanitizer')

//APP CONFIG
mongoose.connect('mongodb://localhost/blogApp')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressSanitizer())
app.use(methodOverride('_method'))

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

//NEW ROUTE
app.get('/blogs/new', (req, res) => {
  res.render('new')
})

//CREATE ROUTE
app.post('/blogs', (req, res) => {
  //create blog
  let {title, image, body} = req.body
  body = req.sanitize(body)

  Blog.create({title, image, body}, (err, newBlog) => {
    if (err) {
      res.render('new')
    } else {
      //then, redirect to the index
      console.log('Newly created blog: ', newBlog)
      res.redirect('/blogs')
    }
  })
})

//SHOW ROUTE
app.get('/blogs/:id', (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect('/blogs')
    } else {
      res.render('show', {blog: foundBlog})
    }
  })
})

//EDIT ROUTE
app.get('/blogs/:id/edit', (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect('/blogs')
    } else {
      res.render('edit', {blog: foundBlog})
    }
  })
})

//UPDATE ROUTE
app.put('/blogs/:id', (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body)

  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
    if (err) {
      res.redirect('/blogs')
    } else {
      res.redirect(`/blogs/${req.params.id}`)
    }
  })
})

//DELETE ROOUTE
app.delete('/blogs/:id', (req, res) => {
  Blog.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(`This is the error ${err}`)
      res.redirect('/blogs')
    } else {
      res.redirect('/blogs')
    }
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
