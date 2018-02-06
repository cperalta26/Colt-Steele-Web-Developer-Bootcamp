const p1Button = document.querySelector("#p1")
const p1Display = document.querySelector("#p1Display")
let p1Score = 0

const p2Button = document.getElementById("p2")
const p2Display = document.getElementById("p2Display")
let p2Score = 0

p1Button.addEventListener("click", ()=>{
  p1Score++
  p1Display.innerText = p1Score
})

p2Button.addEventListener("click", ()=>{
  p2Score++
  p2Display.textContent = p2Score
})
