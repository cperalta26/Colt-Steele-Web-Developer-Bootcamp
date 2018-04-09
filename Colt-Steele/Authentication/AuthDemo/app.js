const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/auth_demo_app')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(3000, () => {
  console.log('Now listening on port 3000!!!')
})
