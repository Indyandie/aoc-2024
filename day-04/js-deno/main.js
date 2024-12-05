// Day #: Name

// Part 1

const input = await Deno.readTextFile('../sample-input')
const xmasArr = input.split('\n').map((rows) => {
  const row = rows.split('')
  // row.pop()
  return row
})

const rowsNum = xmasArr.length
const colsNum = xmasArr[1].length
const xmas = 'XMAS'
const xmasLen = xmas.length

const maxVertDown = xmasArr.length - (xmasLen + 1)
const minVertUp = xmasLen - 1

for (let x = 0; x < rowsNum; x++) {
  const currRow = xmasArr[x]

  const checkVertDown = x < maxVertDown
  const checkVertUp = x > minVertUp

  for (let y = 0; y < colsNum; y++) {
    const seed = xmasArr[x][y]

    if (seed === 'X') {
      let horRight = 'NNNN'
      let slice02 = 'NNNN'
      let diagDownRight = ''
      let diagUpRight = ''
      let diagDownLeft = ''
      let diagUpLeft = ''

      if (y < (xmasArr.length - xmasLen)) {
        horRight = currRow.slice(y, y + 4).join('')

        if (checkVertDown) {
          for (let d = 0; d < xmasLen; d++) {
            diagDownRight = diagDownRight + xmasArr[x + d][y + d]
          }
        } else {
          diagDownRight = 'NNNN'
        }

        if (checkVertUp) {
          for (let d = 0; d < xmasLen; d++) {
            diagUpRight = diagUpRight + xmasArr[x - d][y + d]
          }
        } else {
          diagUpRight = 'NNNN'
        }
      }

      if (y > (xmasLen - 1)) {
        slice02 = currRow.slice(y - 3, y + 1).join('')

        if (checkVertUp) {
          for (let d = 0; d < xmasLen; d++) {
            diagDownLeft = diagDownLeft + xmasArr[x - d][y - d]
          }
        } else {
          diagDownLeft = 'NNNN'
        }

        if (checkVertDown) {
          for (let d = 0; d < xmasLen; d++) {
            diagUpLeft = diagUpLeft + xmasArr[x + d][y - d]
          }
        } else {
          diagUpLeft = 'NNNN'
        }
      }

      let vertDown = ''

      if (checkVertDown) {
        for (let v = x; v < (x + xmasLen); v++) {
          vertDown = vertDown + xmasArr[v][y]
        }
      } else {
        vertDown = 'NNNN'
      }

      let vertUp = ''

      if (checkVertUp) {
        for (let v = x; v > (x - xmasLen); v--) {
          vertUp = xmasArr[v][y] + vertUp
        }
      } else {
        vertUp = 'NNNN'
      }

      console.log(seed, x, y)
      console.log('HR', horRight, 'HB', slice02)
      console.log('VD', vertDown, 'VU', vertUp)
      console.log('DDR', diagDownRight, 'DUR', diagUpRight)
      console.log('DDL', diagDownLeft, 'DUL', diagUpLeft)
    }
  }
}

// console.log(xmasArr, "\n\n\n", rowsNum, colsNum)
console.log('\n\n\n', 'vertdown', maxVertDown, 'vertup', minVertUp)
console.log('\n\n\n', rowsNum, colsNum)

// Part 2
