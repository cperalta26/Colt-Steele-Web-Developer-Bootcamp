const p1Button = document.querySelector("#p1")
const p1Display = document.querySelector("#p1Display")
let p1Score = 0


p1Button.addEventListener("click", ()=>{
  p1Display.innerText = p1Score
  p1Score++
})
