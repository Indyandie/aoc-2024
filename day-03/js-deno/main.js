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
const regExpMul = new RegExp(/^mul/)
const regExpDont = new RegExp(/^don't/)
const regExpDo = new RegExp(/^do\(/)
let mulDo = true

const enabledMulArr = inputMatchInstructions.map((instruction, index) => {
  if (regExpMul.test(instruction) && mulDo) {
    const mulNumArr = instruction.match(/\d+/g)
      .map(Number)
    const mulProduct = mulNumArr[0] * mulNumArr[1]
    // console.log(mulDo, '', instruction)
    return mulProduct
  } else if (regExpDont.test(instruction)) {
    // console.log(mulDo, '', instruction)
    mulDo = false
  } else if (regExpDo.test(instruction)) {
    // console.log(mulDo, '', instruction)
    mulDo = true
  }
  return 0
})

const enabledMulSum = enabledMulArr.reduce(
  (accumalator, currentNum) => accumalator + currentNum,
  0,
)

// console.log(inputCleaner)
// console.log(inputMatchInstructions)

// console.log(newOutput)
console.log('Enabled multiplications sum', enabledMulSum)
