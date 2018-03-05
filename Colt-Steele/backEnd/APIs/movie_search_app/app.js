const express = require('express')
const app = express()
const request = require('request')

app.get('/results', (req, res, next) => {
  request('http://www.omdbapi.com/?s=new+york&apikey=thewdb', (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const results = JSON.parse(body)
      res.send(results['Search'][0]['Title'])
    }
  })
})

app.listen(3000, () => {
  console.log('Movie App has started!!!')
})
