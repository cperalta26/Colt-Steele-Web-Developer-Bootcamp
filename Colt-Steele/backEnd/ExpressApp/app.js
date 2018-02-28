const express = require('express')
const app = express()


// "/" => "Hi there!"
app.get('/', (req, res, next) => {
  res.send('Hi there!')
})

// "/bye" => "Goodbye!"
app.get('/bye', (req, res, next) => {
  res.send('Goodbye!')
})

// "/dog" => "MEOW!"
app.get('/dog', (req, res, next) => {
  res.send('MEOW!!!!')
})

app.get('/r/:subredditName', (req, res) => {
  const subreddit = req.params.subredditName
  res.send(`WELCOME TO THE ${subreddit.toUpperCase()} SUBREDDIT!`)
})

app.get('r/:subredditName/comments/:id/:title', (req, res) => {
  res.send('Welcome to the comments page!!!')
})

app.get('*', (req, res, next) => {
  res.send('You Are a Star!')
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
