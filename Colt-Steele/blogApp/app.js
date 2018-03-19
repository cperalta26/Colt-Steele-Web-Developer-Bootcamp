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

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
