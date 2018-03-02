const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const friends = ['Tony', 'Miranda', 'Justin', 'Pierre', 'Lily']

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {
  res.render('home')
})

app.post('/addfriend', (req, res) => {
  const newFriend = req.body.newfriend
  friends.push(newFriend)
  res.redirect('/friends')
})

app.get('/friends', (req, res) => {

  res.render('friends', {friends})
})

app.listen(3000, () => {
  console.log('Jamming on port 3000!!!!')
})
