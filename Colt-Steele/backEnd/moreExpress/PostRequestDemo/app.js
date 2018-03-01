const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {
  res.render('home')
})

app.get('/friends', (req, res) => {
  const friends = ['Tony', 'Miranda', 'Justin', 'Pierre', 'Lily']

  res.render('friends', {friends})
})

app.listen(3000, () => {
  console.log('Jamming on port 3000!!!!')
})
