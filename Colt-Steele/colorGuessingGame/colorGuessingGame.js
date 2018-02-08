let colors = [
  "rgb(255, 0, 0)",
  "rgb(255, 255, 0)",
  "rgb(0, 255, 0)",
  "rgb(0, 255, 255)",
  "rgb(0, 0, 255)",
  "rgb(255, 0, 255)"
]

const squares = document.getElementsByClassName("square")
let pickedColor = pickColor()
let colorDisplay = document.getElementById("colorDisplay")
const messageDisplay = document.getElementById("message")

colorDisplay.textContent = pickedColor

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
      changeColor(clickedColor)
    } else {
      this.style.backgroundColor = '#232323'
      messageDisplay.innerText = "Try Again"
    }
  })
}

function changeColor (color){
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
