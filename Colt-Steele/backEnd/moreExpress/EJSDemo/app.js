const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.get('/fallinlovewith/:thing', (req, res) => {
  const thing = req.params.thing
  res.render('love.ejs', {thing})
})

app.listen(3000, () => {
  console.log('Server is listening on PORT 3000!!!')
})
