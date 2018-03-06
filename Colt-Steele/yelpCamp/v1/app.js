const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {
  res.render('landing')
})

app.listen(3000, () => {
  console.log('The YelpCamp Server Has Started!')
})
