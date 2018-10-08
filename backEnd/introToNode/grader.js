function average(arrOfTest) {
  const total = arrOfTest.reduce((total, currentNum)=>{
    return total + currentNum
  }, 0)
  const avg = Math.round(total/(arrOfTest.length))
  console.log('The average score is ' + avg)
}

const scores1 = [90, 98, 89, 100, 100, 86, 94]
const scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49]

average(scores1)
average(scores2)

