// Day #: Name

// Part 1

// const input = await Deno.readTextFile('../sample-input')
const input = await Deno.readTextFile('../input')
const xmasArr = input.split('\n').map((rows) => {
  const row = rows.split('')
  // row.pop()
  return row
})
// xmasArr.pop()

const rowsNum = xmasArr.length
const colsNum = xmasArr[1].length
const xmas = 'XMAS'
const xmasLen = xmas.length

const maxVertDown = xmasArr.length - (xmasLen)
const minVertUp = xmasLen - 2 // here too

let xmasCount = 0

function xmasCounter(str, arr, dir) {
  if (str === 'XMAS' || str === 'SAMX') {
    xmasCount = xmasCount + 1
  }
  console.log(arr, dir, str, xmasCount)
}

for (let x = 0; x < rowsNum; x++) {
  const currRow = xmasArr[x]

  const checkVertDown = x < maxVertDown
  const checkVertUp = x > minVertUp

  for (let y = 0; y < colsNum; y++) {
    const seed = xmasArr[x][y]

    if (seed === 'X') {
      let horRight = '::::'
      let horLeft = '::::'
      let diagDownRight = '::::'
      let diagUpRight = '::::'
      let diagDownLeft = '::::'
      let diagUpLeft = '::::'

      if (y < (xmasArr.length - xmasLen)) {
        horRight = currRow.slice(y, y + 4).join('')
        // horRight = 'X'
        // for (let r = y + 1; r < (y + 4); r++) {
        //   horRight = horRight + xmasArr[x][r]
        // }
        xmasCounter(horRight, [x, y], '->')

        if (checkVertDown) {
          diagDownRight = 'X'
          for (let d = 1; d < xmasLen; d++) {
            diagDownRight = diagDownRight + xmasArr[x + d][y + d]
          }
          xmasCounter(diagDownRight, [x, y], '->down')
        }

        if (checkVertUp) {
          diagUpRight = 'X'
          for (let d = 1; d < xmasLen; d++) {
            diagUpRight = diagUpRight + xmasArr[x - d][y + d]
          }
          xmasCounter(diagUpRight, [x, y], '->up')
        }
      }

      if (y > (xmasLen - 2)) { // this conditional was throwing everything off :(
        horLeft = 'X'
        for (let l = y - 1; l > (y - 4); l--) {
          horLeft = horLeft + xmasArr[x][l]
        }
        xmasCounter(horLeft, [x, y], '<-')

        if (checkVertUp) {
          diagUpLeft = 'X'
          for (let d = 1; d < xmasLen; d++) {
            diagUpLeft = diagUpLeft + xmasArr[x - d][y - d]
          }
          xmasCounter(diagUpLeft, [x, y], '<-up>')
        }

        if (checkVertDown) {
          diagDownLeft = 'X'
          for (let d = 1; d < xmasLen; d++) {
            diagDownLeft = diagDownLeft + xmasArr[x + d][y - d]
          }
          xmasCounter(diagDownLeft, [x, y], '<-down')
        }
      }

      let vertDown = ''

      if (checkVertDown) {
        for (let v = x; v < (x + xmasLen); v++) {
          vertDown = vertDown + xmasArr[v][y]
        }
        xmasCounter(vertDown, [x, y], 'down')
      }

      let vertUp = ''

      if (checkVertUp) {
        for (let v = x; v > (x - xmasLen); v--) {
          vertUp = xmasArr[v][y] + vertUp
        }
        xmasCounter(vertUp, [x, y], 'up')
      }

      console.log(seed, x, y)
    }
  }
}

// console.log(xmasArr, "\n\n\n", rowsNum, colsNum)
console.log('\n\n\n', 'vertdown', maxVertDown, 'vertup', minVertUp)
console.log('\n\n\n', rowsNum, colsNum)

console.log('xmas count', xmasCount)
console.log(
  xmasLen,
  'min vertical up', minVertUp,
  'min vertical down', maxVertDown,
)
// console.log(xmasArr)

// Part 2
