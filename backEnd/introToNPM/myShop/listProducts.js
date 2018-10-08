const faker = require('faker')

console.log('==================================')
console.log('        WELCOME TO MY SHOP        ')
console.log('==================================')

for (var i = 0; i < 10; i++) {
  //using API methods
  console.log(faker.fake('{{commerce.productName}} ' + '$' + '{{commerce.price}}'))

  //using Node
  console.log(faker.commerce.productName() + ' - $' + faker.commerce.price())
}
