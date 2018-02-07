const p1Button = document.querySelector("#p1")
const p1Display = document.querySelector("#p1Display")
let p1Score = 0

const p2Button = document.getElementById("p2")
const p2Display = document.getElementById("p2Display")
let p2Score = 0

let gameOver = false
const winningScore = 5

const resetButton = document.getElementById('reset')

p1Button.addEventListener("click", ()=>{
  if (!gameOver) {
    p1Score++
    if (p1Score === winningScore) {
      gameOver = true
      p1Display.classList.add('winner')
    }
    p1Display.innerText = p1Score
  }
})

p2Button.addEventListener("click", ()=>{
  if (!gameOver) {
    p2Score++
    if (p2Score === winningScore) {
      gameOver = true
      p2Display.classList.add('winner')
    }
    p2Display.textContent = p2Score
  }
})

resetButton.addEventListener("click", ()=>{
  p1Score = 0
  p1Display.textContent = 0
  p1Display.classList.remove('winner')

  p2Score = 0
  p2Display.textContent = 0
  p2Display.classList.remove('winner')

  gameOver = false
})
