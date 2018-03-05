const express = require('express')
const app = express()
const request = require('request')
app.set('view engine', 'ejs')

app.get('/results', (req, res, next) => {
  request('http://www.omdbapi.com/?s=new+york&apikey=thewdb', (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const resultsData = JSON.parse(body)
      res.render('results', {resultsData})
    }
  })
})

app.listen(3000, () => {
  console.log('Movie App has started!!!')
})
