const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.get('/fallinlovewith/:thing', (req, res) => {
  const thing = req.params.thing
  res.render('love.ejs', {thing})
})

app.get('/posts', (req, res, next) => {
  const posts = [
    {title: 'Post 1', author: 'Susy'},
    {title: 'My adorable pet bunny', author: 'Charlie'},
    {title: 'Can you believe this pomsky?', author: 'Colt'}
  ]

  res.render('posts.ejs', {posts})
})

app.listen(3000, () => {
  console.log('Server is listening on PORT 3000!!!')
})
