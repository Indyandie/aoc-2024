// Day 3: Mull It Over

// Part 1

const input = await Deno.readTextFile('../input')
const inputCleaned = input.replace(/[^0-9mul(),]/g, '')
const inputMatches = input.match(/mul\(\d+,\d+\)/g)
const mulArray = inputMatches.map((mulStr) => {
  const mulNumArr = mulStr.match(/\d+/g)
    .map(Number)
  const mulProduct = mulNumArr[0] * mulNumArr[1]
  return mulProduct
})

const mulSum = mulArray.reduce(
  (accumalator, currentNum) => accumalator + currentNum,
  0,
)

// console.log(
//   'original input:\n',
//   input,
// )
// console.log(
//   'Cleaned input:\n',
//   inputCleaned,
// )
// console.log(
//   'matched input:\n',
//   inputMatches,
// )

// console.log(input.length)
// console.log(inputCleaned.length)
// console.log(inputMatches.length)
// console.log(mulArray)

// console.log(mulArray)
console.log('multiplications sum:', mulSum)

// Part 2
const inputCleaner = input.replace(/[^0-9muldont(),']/g, '')
const inputMatchInstructions = input.match(/(mul\(\d+,\d+\))|do\(\)|don't\(\)/g)
console.log(inputCleaner)
console.log(inputMatchInstructions)
