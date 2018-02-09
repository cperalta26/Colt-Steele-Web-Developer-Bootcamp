let numSquares = 6
let colors = generateRandomColors(numSquares)

const squares = document.getElementsByClassName("square")
let pickedColor = pickColor()
let colorDisplay = document.getElementById("colorDisplay")
const messageDisplay = document.getElementById("message")
const h1 = document.querySelector('h1')
const resetButton  = document.querySelector('#reset')
const easyBtn = document.querySelector('#easyBtn')
const hardBtn = document.querySelector('#hardBtn')

colorDisplay.textContent = pickedColor

easyBtn.addEventListener("click", function(){
  this.classList.add('selected')
  hardBtn.classList.remove('selected')
  numSquares = 3
  colors = generateRandomColors(numSquares)
  pickedColor = pickColor()
  colorDisplay.textContent = pickedColor
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) squares[i].style.backgroundColor = colors[i]
    else squares[i].style.display = "none"
  }
})

hardBtn.addEventListener("click", () => {
  easyBtn.classList.remove('selected')
  hardBtn.classList.add('selected')
  numSquares = 6
  colors = generateRandomColors(numSquares)
  pickedColor = pickColor()
  colorDisplay.textContent = pickedColor
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i]
    squares[i].style.display = "block"
  }
})

resetButton.addEventListener("click", ()=>{
  //generate all new colors
  colors = generateRandomColors(numSquares)
  //pick a new random color from color from array
  pickedColor = pickColor()
  //change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor
  //change colors of squares
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i]
  }
  h1.style.backgroundColor = '#232323'
})

for (var i = 0; i < squares.length; i++) {
  //add initial colors to squares
  squares[i].style.backgroundColor = colors[i]

  //add click listeners to squares
  squares[i].addEventListener("click", function () {
    //grab color of clicked square
    const clickedColor = this.style.backgroundColor

    //compare color to pickedColor
    if (clickedColor === pickedColor) {
      messageDisplay.innerText = "Correct!"
      changeColors(clickedColor)
      resetButton.textContent = "Play Again?"
      h1.style.backgroundColor = clickedColor
    } else {
      this.style.backgroundColor = '#232323'
      messageDisplay.innerText = "Try Again"
    }
  })
}

function changeColors (color){
  //loop through all squares
  for (var j = 0; j < squares.length; j++) {
    //change each color to match given color
    squares[j].style.backgroundColor = color
  }
}

function pickColor () {
  const random = Math.floor(Math.random() * colors.length)
  return colors[random]
}

function generateRandomColors(num) {
  let arr = []
  //repeat num times
  for (var i = 0; i < num; i++) {
    //get random color and push into array
    arr.push(randomColor())
  }
  //return that array
  return arr
}

function randomColor() {
  //pick a "red" from 0 - 255
  const r = Math.floor(Math.random() * 256)
  //pick a "green" from 0 - 255
  const g = Math.floor(Math.random() * 256)
  //pick a "blue" from 0 - 255
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}
