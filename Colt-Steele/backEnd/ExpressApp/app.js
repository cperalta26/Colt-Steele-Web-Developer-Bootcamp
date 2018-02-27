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

app.listen(3000, () => {
  console.log('listening on port 3000')
})
