const express = require('express')
const app = express()
const request = require('request')

app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {
  res.render('search')
})

app.get('/results', (req, res, next) => {
  const searchQuery = req.query.search
  const url = `http://www.omdbapi.com/?s=${searchQuery}&apikey=thewdb`
  request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const resultsData = JSON.parse(body)
      res.render('results', {resultsData})
    }
  })
})

app.listen(3000, () => {
  console.log('Movie App has started!!!')
})
