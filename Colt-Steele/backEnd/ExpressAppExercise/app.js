const app = require('express')()

app.get('/', (req, res, next) => {
  res.send('Hi there, welcome to my assignment!')
})

app.get('/speak/:animal', (req, res, next) => {
  const animal = req.params.animal.toLowerCase()

  const sounds = {
    pig: '\'Oink\'',
    cow: '\'Moo\'',
    dog: '\'Woof Woof!\'',
    cat: '\'Meow\'',
    sheep: '\'Baa baaa!\'',
  }

  const animalSound = sounds[animal] ? `The ${animal} says ${sounds[animal]}` : 'Not sure about that animal, try another'

  res.send(animalSound)
})

app.get('/repeat/:greeting/:num', (req, res, next) => {
  const num = +req.params.num
  const greeting = req.params.greeting + ' '
  let repeatedGreeting = ''

  for (var i = 0; i < num; i++) {
    repeatedGreeting += greeting
  }

  res.send(repeatedGreeting)
})

app.get('*', (req, res, next) => {
  res.send('Sorry, page not found...What are you doing with your life?')
})

app.listen(8080, () => {
  console.log('Listening on port 8080!!!')
})
