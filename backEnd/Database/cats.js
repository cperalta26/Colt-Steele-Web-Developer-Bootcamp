const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/cat_app')

const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
})

const Cat = mongoose.model('Cat', catSchema)

//adding a new cat to the DB
/* const george = new Cat({
  name: 'Mrs.Norris',
  age: 7,
  temperament: 'Evil'
})

george.save((error, cat) => {
  if (error) {
    console.log('Something went wrong!')
  }
  else {
    console.log('We just saved a cat to the DB!')
    console.log('This is the cat ', cat)
  }
}) */

//adding and saving a cat to the DB by using create
Cat.create({
  name: 'Snow White',
  age: 15,
  temperament: 'Bland'
}, (err, cat) => {
  if (err) {
    console.log('This is the error ' + err)
  } else {
    console.log('This is the cat ' + cat)
  }
})

//retrieve all cats from the DB and console.log each one
Cat.find({}, (err, cats) => {
  if (err) {
    console.log('Oh no, Error!!!')
    console.log('This is the error ', err)
  } else {
    console.log('All the cats....')
    console.log(cats)
  }
})
