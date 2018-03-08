const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {
  res.render('landing')
})

app.get('/campgrounds', (req, res, next) => {
  const campgrounds = [
    {name: 'Salmon Creek', image: 'https://pixabay.com/get/e83db1082cfd043ed95c4518b7444795ea76e5d004b0144395f4c778a1ebb2_340.jpg'},
    {name: 'Granite Hill', image: 'https://pixabay.com/get/e834b90621f6083ed95c4518b7444795ea76e5d004b0144395f4c77aa2ebb1_340.jpg'},
    {name: "Mountain Goat's Rest", image: 'https://pixabay.com/get/eb31b00e28f2083ed95c4518b7444795ea76e5d004b0144395f4c771a7efbd_340.jpg'}
  ]

  res.render('campgrounds', {campgrounds})
})

app.listen(3000, () => {
  console.log('The YelpCamp Server Has Started!')
})
